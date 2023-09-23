export interface DeviceData {
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
	circle_geojson: CircleGeojson;
	created_by: number;
	assigned_to_bandobas: number;
}

export interface CircleGeojson {
	type: string;
	coordinates: number[][][];
}

// export interface DeviceData {
// 	id: number;
// 	is_assigned: boolean;
// 	expires_at: string;
// 	device_type: string;
//  location: Location;
// 	altitude: number;
// 	radius_in_meters: number;
// }
