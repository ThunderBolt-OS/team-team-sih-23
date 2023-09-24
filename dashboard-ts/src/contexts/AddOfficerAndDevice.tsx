import React, { createContext, useState } from 'react';
import dayjs from 'dayjs';

interface AddOfficerAndDeviceData {
	departmentName: string;
	weapons: Array<string>;
	rank: string;
	altitude: string;
	deviceType: string;
	nfcId: string;
	longitude: string;
	latitude: string;
	policeName: string;
	dutyStartTime: string;
	dutyEndTime: string;
	policePhoneNumber: string;
	fenceOption: string;
	geoFenceRadius: number;
	geoFencePolygon: string;
	circleGeoJson: string;
}

export interface AddOfficerAndDeviceMapData {
	longitude?: string;
	latitude?: string;
	markerBaseRadius?: number;
	polygonCoordinates?: string;
}

interface NFCResponseData {
	id: number;
	name: string;
	device_type: string;
}

interface OfficerAndDeviceFormData {
	addOfficerAndDeviceData: AddOfficerAndDeviceData;
	addOfficerAndDeviceMapData: AddOfficerAndDeviceMapData;
	nfcResponseData?: NFCResponseData;
}

interface AddOfficerAndDeviceProps {
	addOfficerAndDeviceFormData: OfficerAndDeviceFormData;
	updateAddOfficerAndDeviceFormData: (data: Partial<OfficerAndDeviceFormData>) => void;
}

export const AddOfficerAndDeviceContext = createContext<AddOfficerAndDeviceProps>({
	addOfficerAndDeviceFormData: {
		addOfficerAndDeviceData: {
			departmentName: '',
			rank: '',
			altitude: '',
			weapons: [],
			deviceType: 'nfc',
			nfcId: '',
			longitude: '',
			latitude: '',
			policeName: '',
			dutyStartTime: dayjs().toISOString(),
			dutyEndTime: '',
			policePhoneNumber: '',
			fenceOption: 'Pt Fence',
			geoFenceRadius: 20,
			geoFencePolygon: '',
			circleGeoJson: ''
		},
		addOfficerAndDeviceMapData: {
			longitude: '',
			latitude: '',
			markerBaseRadius: 0,
			polygonCoordinates: ''
		},
		nfcResponseData: { id: 0, name: '', device_type: '' }
	},
	updateAddOfficerAndDeviceFormData: () => {}
});

export const AddOfficerAndDeviceFormDataContextProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [addOfficerAndDeviceFormData, setFormData] = useState<OfficerAndDeviceFormData>({
		addOfficerAndDeviceData: {
			departmentName: '',
			rank: '',
			altitude: '',
			weapons: [],
			deviceType: 'nfc',
			nfcId: '',
			longitude: '',
			latitude: '',
			policeName: '',
			dutyStartTime: dayjs().toISOString(),
			dutyEndTime: '',
			policePhoneNumber: '',
			fenceOption: 'Pt Fence',
			geoFenceRadius: 20,
			geoFencePolygon: '',
			circleGeoJson: ''
		},
		addOfficerAndDeviceMapData: {
			longitude: '',
			latitude: '',
			markerBaseRadius: 0,
			polygonCoordinates: ''
		},
		nfcResponseData: { id: 0, name: '', device_type: '' }
	});

	const updateAddOfficerAndDeviceFormData = (data: Partial<OfficerAndDeviceFormData>) => {
		setFormData(prevFormData => ({
			...prevFormData,
			...data
		}));
	};

	const contextValue: AddOfficerAndDeviceProps = {
		addOfficerAndDeviceFormData,
		updateAddOfficerAndDeviceFormData
	};

	return <AddOfficerAndDeviceContext.Provider value={contextValue}>{children}</AddOfficerAndDeviceContext.Provider>;
};
