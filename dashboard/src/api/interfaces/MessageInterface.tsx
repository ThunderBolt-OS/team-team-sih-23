export interface Conversation {
	id: number;
	password: string;
	last_login: any;
	phone: string;
	role: string;
	name: string;
	email: any;
	image_url: any;
	department: string;
	rank: string;
	is_admin: boolean;
	timestamp: string;
	police_station: any;
}

export interface Message {
	id: number;
	sender: Sender;
	receiver: Receiver;
	content: string;
	timestamp: string;
	adminNumber: string;
}

export interface Sender {
	phone: string;
}

export interface Receiver {
	phone: string;
}
