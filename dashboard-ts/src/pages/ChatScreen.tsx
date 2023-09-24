import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMessageContext } from '../contexts/MessageContext';
import MessageComponent from '../components/ChatScreen/MessageComponent';
import TextField from '@mui/material/TextField';
import {
	Box,
	Button,
	Grid,
	Stack,
	Typography,
	Avatar,
	useTheme,
	Paper,
	IconButton,
	Divider,
	Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { GET } from '../api/fetch';

const ChatScreen = () => {
	const params = useParams<{ phone: string }>();
	const messageContext = useMessageContext();
	const [Text, setText] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();
	const boxRef = useRef<HTMLDivElement | null>(null);
	// Scroll to the bottom when the component mounts or new messages arrive
	const scrollToBottom = () => {
		if (boxRef.current) {
			boxRef.current.scrollTop = boxRef.current.scrollHeight;
		}
	};

	const [phone, setPhone] = useState<string | null>(null);

	useEffect(() => {
		scrollToBottom();
	}, [messageContext]);

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

	return phone ? (
		<Grid container>
			<Grid
				item
				xs={5}
				md={4}
			>
				<Paper
					sx={{
						height: '97vh',
						p: 2,
						pt: 2,
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							top: 6
						}}
					>
						<IconButton
							onClick={() => {
								navigate('/dashboard/');
							}}
						>
							<ArrowBackIcon />
						</IconButton>
					</Box>
					<Typography
						variant='h1'
						align='center'
						marginBottom={2}
					>
						All Police Officers
					</Typography>
					{messageContext &&
						messageContext.Convos &&
						messageContext.Convos.length > 0 &&
						messageContext.Convos.map((val, index) => {
							// Add index as the second argument to map function
							// TODO: Remove this hardcoding
							if (val.phone !== phone) {
								return (
									<Box
										key={index} // Add a unique key for each iteration, using index as the key
										style={{ display: 'flex', flexDirection: 'row', marginBottom: 25 }}
										onClick={() => navigate('/dashboard/chat/' + val.phone)}
									>
										<Stack
											direction={'row'}
											spacing={2}
											alignItems={'center'}
											sx={{
												bgcolor: `${
													params.phone === val.phone ? theme.palette.primary[300] : ''
												}`,
												width: '100%',
												borderRadius: 2,
												cursor: 'pointer',
												p: 1
											}}
										>
											<>
												<Avatar
													alt={val.name}
													src={val.image_url}
													sx={{ width: 45, height: 45 }}
												/>
												<Box>
													<Stack direction='row'>
														{/* <Chip
															label={val.role}
														/> */}
														<Typography
															variant='h4'
															sx={{
																color: `${
																	params.phone === val.phone
																		? theme.palette.common.white
																		: theme.palette.common.black
																}`
															}}
														>
															{val.name}
														</Typography>
													</Stack>
													<Typography
														variant='h6'
														sx={{
															color: `${
																params.phone === val.phone
																	? theme.palette.common.white
																	: theme.palette.common.black
															}`
														}}
													>
														{val.phone}
													</Typography>
													<Chip
														// variant='h6'
														sx={{
															color: `${
																params.phone === val.phone
																	? theme.palette.common.white
																	: theme.palette.primary.dark
															}`
														}}
														label={val.email}
													/>
												</Box>
											</>
										</Stack>
										{index !== messageContext.Convos.length - 1 && <Divider />}{' '}
									</Box>
								);
							} else {
								return <React.Fragment key={index} />;
							}
						})}
				</Paper>
			</Grid>
			<Grid
				item
				xs={7}
				md={8}
				sx={{}}
			>
				<Paper
					sx={{
						// height: '100vh',
						height: '97vh',
						p: 2.4
						// overflowY: 'scroll'
					}}
				>
					<Box>
						<Box
							ref={boxRef}
							sx={{ overflowY: 'scroll', height: '85vh', mb: 1.4 }}
						>
							{messageContext &&
								messageContext.AllMessages &&
								params.phone &&
								messageContext.AllMessages[params.phone] &&
								messageContext.AllMessages[params.phone].map(val => (
									<MessageComponent
										{...val}
										key={val.id}
										adminNumber={phone}
									/>
								))}
						</Box>

						<Stack
							direction='row'
							spacing={2}
							sx={{ position: 'absolute', width: '95%', bottom: 12 }}
						>
							<TextField
								id='outlined-basic'
								label='Enter message to send'
								variant='outlined'
								onChange={val => setText(val.target.value)}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										console.log('keydown', e);
										if (params.phone) messageContext?.sendMessage(params.phone, Text);
										setText('');
									}
								}}
								value={Text}
								fullWidth
							/>
							<Button
								variant='contained'
								size='small'
								sx={{ width: '16%' }}
								type='submit'
								onClick={() => {
									if (params.phone) messageContext?.sendMessage(params.phone, Text);
									setText('');
								}}
								endIcon={<SendIcon />}
							>
								Send
							</Button>
						</Stack>
					</Box>
				</Paper>
			</Grid>
		</Grid>
	) : null;
};

export default ChatScreen;
