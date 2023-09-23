export type FetchAllBandobastType = {
	server_timestamp: string;
	data: Array<{
		id: number;
		name: string;
		location_data: string;
		start_time: string;
		end_time: string;
		timestamp: string;
		locality_type: string;
		event_type: string;
		bandobast_type: string;
		police_departments: string;
		security_covers: string;
		description: string;
		created_by: number;
	}>;
};

export type AllBandobastType = {
	id: number;
	name: string;
	location_data: string;
	start_time: string;
	end_time: string;
	timestamp: string;
	locality_type: string;
	event_type: string;
	bandobast_type: string;
	police_departments: string;
	security_covers: string;
	description: string;
	created_by: number;
};

export type PoliceApiResponseType = {
	type: string;
	features: Array<{
		type: string;
		properties: {
			name: string;
			country: string;
			country_code: string;
			state: string;
			county: string;
			city: string;
			postcode: string;
			district: string;
			neighbourhood?: string;
			suburb: string;
			street: string;
			lon: number;
			lat: number;
			state_code: string;
			formatted: string;
			address_line1: string;
			address_line2: string;
			categories: Array<string>;
			details: Array<string>;
			datasource: {
				sourcename: string;
				attribution: string;
				license: string;
				url: string;
				raw: {
					name: string;
					osm_id: number;
					amenity: string;
					osm_type: string;
					'addr:city'?: string;
					'addr:postcode'?: number;
					building?: string;
					opening_hours?: string;
					'addr:street'?: string;
					'addr:housenumber'?: string;
					phone?: string;
					operator?: string;
				};
			};
			distance: number;
			place_id: string;
			housenumber?: string;
		};
		geometry: {
			type: string;
			coordinates: Array<number>;
		};
	}>;
};

export type HospitalApiResponseType = {
	type: string;
	features: Array<{
		type: string;
		properties: {
			name: string;
			country: string;
			country_code: string;
			state: string;
			county: string;
			city: string;
			postcode: string;
			district: string;
			neighbourhood?: string;
			suburb: string;
			street: string;
			lon: number;
			lat: number;
			state_code: string;
			formatted: string;
			address_line1: string;
			address_line2: string;
			categories: Array<string>;
			details: Array<string>;
			datasource: {
				sourcename: string;
				attribution: string;
				license: string;
				url: string;
				raw: {
					name: string;
					email?: string;
					osm_id: number;
					amenity: string;
					website?: string;
					osm_type: string;
					'addr:city'?: string;
					'addr:full'?: string;
					'addr:state'?: string;
					'addr:street'?: string;
					'addr:district'?: string;
					'addr:postcode'?: number;
					'contact:phone'?: number;
					'operator:type'?: string;
					'addr:housename'?: string;
					building?: string;
					'building:levels'?: number;
					healthcare?: string;
					operator?: string;
					description?: string;
				};
			};
			distance: number;
			place_id: string;
		};
		geometry: {
			type: string;
			coordinates: Array<number>;
		};
	}>;
};

export type NearByOfficersWithRadiusType = Array<{
	id: number;
	police_user: {
		id: number;
		password: string;
		last_login: any;
		phone: string;
		role: string;
		name: string;
		email: string;
		image_url: string;
		department: string;
		rank: string;
		is_admin: boolean;
		timestamp: string;
		fcm_token: any;
		police_station?: number;
	};
	assigned_nfc_device: {
		latitude: number;
		longitude: number;
		device_type: string;
	};
	fcm_token: string;
	device_id: string;
	duty_start_time: string;
	duty_end_time: string;
	department: string;
	rank: string;
	weapons: string;
	instructions?: string;
	created_by: number;
}>;

export type GetDeviceByID = {
	id: number;
	is_assigned: boolean;
	name: string;
	nfc_data: string;
	timestamp: string;
	expires_at: string;
	device_type: string;
	latitude: number;
	longitude: number;
	altitude: number;
	radius_in_meters: number;
	circle_geojson: {
		type: string;
		coordinates: Array<Array<Array<number>>>;
	};
	created_by: number;
	assigned_to_bandobas: number;
};

export type AllOfficersOfBandobasType = Array<{
	id: number;
	police_user: {
		id: number;
		name: string;
		phone: string;
		email: string;
		image_url: string;
		rank: string;
		department: string;
	};
	fcm_token: string;
	device_id: string;
	duty_start_time: string;
	duty_end_time: string;
	department: string;
	rank: string;
	weapons: string;
	instructions?: string;
	created_by: number;
	assigned_nfc_device: number;
}>;

export type GetBandobastOfficerByIdResponseType = {
	bandobas_officer: {
		id: number;
		assigned_nfc_device: {
			id: number;
			name: string;
			nfc_data: string;
			timestamp: string;
			expires_at: string;
			device_type: string;
			latitude: number;
			longitude: number;
			altitude: number;
			radius_in_meters: number;
			circle_geojson: string;
			created_by: number;
			assigned_to_bandobas: number;
		};
		police_user: {
			id: number;
			password: string;
			last_login: any;
			phone: string;
			role: string;
			name: string;
			email: string;
			image_url: string;
			department: string;
			rank: string;
			is_admin: boolean;
			timestamp: string;
			police_station: number;
		};
		fcm_token: string;
		device_id: string;
		duty_start_time: string;
		duty_end_time: string;
		created_by: number;
	};
	location_serializer: {
		id: number;
		latitude: string;
		longitude: string;
		altitude: string;
		location_accuracy: string;
		speed: string;
		distance_from_nfc_device: number;
		is_point_inside_polygon: boolean;
		client_timestamp: string;
		timestamp: string;
		is_moving: string;
		speed_accuracy: string;
		heading: string;
		heading_accuracy: string;
		ellipsoidal_altitude: string;
		altitude_accuracy: string;
		battery_level: string;
		battery_is_charging: string;
		activity_type: string;
		activity_confidence: string;
		bearing: any;
		officer: number;
	};
};

export type RequestNFCScanType = {
	id: number;
	status: string;
	time_difference: string;
	request_time: string;
	police_scan_timestamp: any;
	network_admin: number;
	police: number;
};

export type CreateBandobastAPIResponseType = {
	id: number;
	name: string;
	location_data: string;
	start_time: string;
	end_time: string;
	timestamp: string;
	locality_type: string;
	event_type: string;
	bandobast_type: string;
	police_departments: string;
	security_covers: string;
	description: string;
	created_by: number;
};

export type NFCResponseDataType = {
	id: number;
	is_assigned: boolean;
	name: string;
	nfc_data: string;
	timestamp: string;
	expires_at: string;
	device_type: string;
	latitude: number;
	longitude: number;
	altitude: number;
	radius_in_meters: number;
	circle_geojson: {
		type: string;
		coordinates: Array<Array<Array<number>>>;
	};
	created_by: number;
	assigned_to_bandobas: number;
};

export type AddOfficerToBandobastType = {
	id: number;
	police_user: string;
	mobile: string;
	fcm_token: string;
	device_id: string;
	created_by: number;
	assigned_nfc_device: number;
};

export type GetOfficerFromStartTimeToEndtimeType = {
	available_user_ids: Array<{
		id: number;
		name: string;
		phone: string;
		email: string;
		image_url: string;
		rank: string;
		department: string;
	}>;
};
