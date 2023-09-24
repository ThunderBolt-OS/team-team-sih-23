import React, { createContext, useState } from 'react';
import dayjs from 'dayjs';

interface StepperStep {
	activeStep: number;
}

interface Step1Data {
	coordinates: string;
}

interface Step2Data {
	securityCover: string;
}

interface Step3Data {
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

export interface StepperMapData {
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

interface FormData {
	stepperStep: StepperStep;
	step1Data: Step1Data;
	step2Data: Step2Data;
	step3Data: Step3Data;
	mapData?: StepperMapData;
	nfcResponseData?: NFCResponseData;
}

interface StepperFormDataContextProps {
	formData: FormData;
	updateFormData: (data: Partial<FormData>) => void;
}

export const StepperFormDataContext = createContext<StepperFormDataContextProps>({
	formData: {
		stepperStep: { activeStep: 0 },
		step1Data: { coordinates: '' },
		step2Data: { securityCover: '' },
		step3Data: {
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
		mapData: {
			longitude: '',
			latitude: '',
			markerBaseRadius: 0,
			polygonCoordinates: ''
		},
		nfcResponseData: { id: 0, name: '', device_type: '' }
	},
	updateFormData: () => {}
});

export const StepperFormDataContextProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [formData, setFormData] = useState<FormData>({
		stepperStep: { activeStep: 0 },
		step1Data: { coordinates: '' },
		step2Data: { securityCover: '' },
		step3Data: {
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
		mapData: {
			longitude: '',
			latitude: '',
			markerBaseRadius: 0,
			polygonCoordinates: ''
		},
		nfcResponseData: { id: 0, name: '', device_type: '' }
	});

	const updateFormData = (data: Partial<FormData>) => {
		setFormData(prevFormData => ({
			...prevFormData,
			...data
		}));
	};

	const contextValue: StepperFormDataContextProps = {
		formData,
		updateFormData
	};

	return <StepperFormDataContext.Provider value={contextValue}>{children}</StepperFormDataContext.Provider>;
};
