import React, { useEffect, useRef } from 'react';
import { Message } from '../../api/interfaces/MessageInterface';
import { styled, Theme, useTheme } from '@mui/material/styles';
import { Paper, Typography, Box } from '@mui/material';

interface MessageContainerProps {
	sender: {
		phone: string;
	};
	adminNumber: string;
}

const MessageContainer = styled('div')<MessageContainerProps>(({ sender, adminNumber }) => ({
	display: 'flex',
	justifyContent: sender.phone === adminNumber ? 'flex-end' : 'flex-start',
	marginBottom: 8
}));

interface MessageCardProps {
	sender: {
		phone: string;
	};
	theme: Theme;
	adminNumber: string;
}

const MessageCard = styled(Paper)<MessageCardProps>(({ theme, sender, adminNumber }) => ({
	padding: theme.spacing(1),
	height: 'auto',
	maxWidth: '72%',
	borderRadius: theme.spacing(1.6),
	backgroundColor:
		sender.phone === adminNumber ? `${theme.palette.primary.light}` : `${theme.palette.secondary[100]}`,
	display: 'flex',
	flexDirection: 'column'
}));

const MessageText = styled(Typography)({
	fontWeight: 400,
	fontSize: 14,
	color: '#474C59',
	wordWrap: 'break-word'
});

const TimeStampText = styled(Typography)<MessageContainerProps>(({ sender, theme, adminNumber }) => ({
	fontFamily: 'Poppins',
	fontWeight: 400,
	fontSize: 12,
	color: '#636465',
	alignSelf: sender.phone === adminNumber ? 'flex-end' : 'flex-start'
}));

const formatTime = (isoTime: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	};
	return new Intl.DateTimeFormat('en-US', options).format(new Date(isoTime));
};

const MessageCardComponent: React.FC<Message> = (props: Message) => {
	const theme = useTheme();
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messageRef.current) {
			messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
		}
	}, [props]);

	return (
		<Box ref={messageRef}>
			<MessageContainer
				sender={props.sender}
				adminNumber={props.adminNumber}
			>
				<MessageCard
					sender={props.sender}
					theme={theme}
					adminNumber={props.adminNumber}
				>
					<MessageText>{props.content}</MessageText>
					<TimeStampText
						theme={theme}
						sender={props.sender}
						adminNumber={props.adminNumber}
					>
						{formatTime(props.timestamp)}
					</TimeStampText>
				</MessageCard>
			</MessageContainer>
		</Box>
	);
};

export default MessageCardComponent;
