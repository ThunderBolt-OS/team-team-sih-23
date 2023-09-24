import axios from 'axios';
import React, { useState, useEffect, useContext, createContext, useCallback, useMemo } from 'react';
import { Conversation, Message } from '../api/interfaces/MessageInterface';
import { GET } from '../api/fetch';
import { webSocketBaseUrl } from '../constants';
import { AuthContext } from './AuthProvider';

interface Messaging {
	Convos: Conversation[];
	AllMessages: {
		[phone: string]: Message[];
	};
	sendMessage: (receiver_phone: string, content: string) => void;
}

const appContext = createContext<Messaging | null>(null);
export function MessageProvider({ children }: any) {
	const context = useContextProvided();
	return <appContext.Provider value={context}>{children}</appContext.Provider>;
}

export const useMessageContext = () => {
	return useContext(appContext);
};
function useContextProvided() {
	const [Convos, setConvos] = useState<Conversation[]>([]);
	const [AllMessages, setAllMessages] = useState<{ [phone: string]: Message[] }>({});
	const [WS, setWS] = useState<WebSocket>();

	// const AllMessageMemo = useMemo(() => AllMessages, [AllMessages])
	const auth_context = useContext(AuthContext);
	// useEffect(() => {
	// 	console.log(AllMessages);
	// }, [AllMessages]);

	const [phone, setPhone] = useState<string | null>(null);

	useEffect(() => {
		GET('auth/phone').then(res => {
			console.log('Res', res);
			if (res?.phone) {
				setPhone(res.phone);
			} else {
				console.log('ERROR getting phone ChatScreen.tsx | 48');
			}
		});
	}, []);

	useEffect(() => {
		if (!auth_context.accessToken) return;
		(async () => {
			const convos: { conversations: Conversation[] } = await GET('chat/conversations/');
			if (convos.conversations) {
				setConvos(convos.conversations);
				const state_data: { [phone: string]: Message[] } = {};
				for (let index = 0; index < convos.conversations.length; index++) {
					const element = convos.conversations[index];
					// console.log(element.phone);
					const messageArray: Message[] = await GET('chat/messages/' + element.phone);
					state_data[element.phone] = messageArray;
					// setAllMessages({...AllMessages, [element.phone]: messageArray});
					// console.log(messageArray)
				}
				setAllMessages({ ...state_data });
				// console.log('TOTAL MESSAGES:', AllMessages);
				// console.log(AllMessages)
			}
		})();
	}, [auth_context.accessToken]);

	const sendMessage = (receiver_phone: string, content: string) => {
		if (WS)
			WS?.send(
				JSON.stringify({
					type: 'private_message',
					receiver_phone,
					content
				})
			);
	};
	const getAndSetConvos = async () => {
		const convos: { conversations: Conversation[] } = await GET('chat/conversations/');
		if (convos.conversations) {
			setConvos(convos.conversations);
		}
	};

	useEffect(() => {
		if (!auth_context.accessToken && WS && !phone) return;
		// console.log('message context');
		const ws = new WebSocket(webSocketBaseUrl + 'ws/chat/');
		setWS(ws);
		// ws.close();
		ws.onopen = () => {
			// console.log('WebSocket connection opened');
		};

		ws.onmessage = e => {
			console.log('Received message:', e.data);
			const recv_message = JSON.parse(e.data);
			if (recv_message.type == 'chat_message') {
				const message: Message = recv_message.content;
				if (message) {
					// const all_msg = AllMessages;
					// console.log(all_msg);
					// console.log('my_data', appContext && appContext.OfficerData[0]);
					if (phone != message.sender.phone)
						// all_msg[message.sender.phone].push(message);
						setAllMessages(previous => {
							const data = previous;
							if (data[message.sender.phone]) data[message.sender.phone].push(message);
							else {
								getAndSetConvos();
								data[message.sender.phone] = [message];
							}
							// console.log(data);
							return { ...data };
						});
					else
						setAllMessages(previous => {
							const data = previous;
							if (data[message.receiver.phone]) data[message.receiver.phone].push(message);
							else {
								getAndSetConvos();
								data[message.receiver.phone] = [message];
							}
							// console.log(data);
							return { ...data };
						});
					// setAllMessages({...all_msg});
				}
			}
		};

		ws.onerror = e => {
			console.log('WebSocket error:', e);
		};

		ws.onclose = e => {
			console.log('WebSocket connection closed:', e.code, e.reason);
		};

		return () => {
			ws.close();
		};
	}, [auth_context.accessToken, phone]);

	return {
		Convos,
		AllMessages,
		sendMessage
	};
}
