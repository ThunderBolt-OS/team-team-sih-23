import React, { createContext, useState } from 'react';

interface ShowDeviceOrOfficerData {
	showDeviceOrOfficer: string;
}

interface ShowOfficerImageOrStatusData {
	showOfficerImageOrStatus: string;
}

interface ShowDeviceOrOfficerProps {
	showDeviceOrOfficerData: ShowDeviceOrOfficerData;
	updateShowDeviceOrOfficerData: (data: Partial<ShowDeviceOrOfficerData>) => void;

	showOfficerImageOrStatusData: ShowOfficerImageOrStatusData;
	updateOfficerImageOrStatusData: (data: Partial<ShowOfficerImageOrStatusData>) => void;
}

export const ShowDeviceOrOfficerContext = createContext<ShowDeviceOrOfficerProps>({
	showDeviceOrOfficerData: {
		showDeviceOrOfficer: 'devices'
	},
	updateShowDeviceOrOfficerData: () => {},

	showOfficerImageOrStatusData: {
		showOfficerImageOrStatus: 'image'
	},
	updateOfficerImageOrStatusData: () => {}
});

export const ShowDeviceOrOfficerContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [showDeviceOrOfficerData, setShowDeviceOrOfficerData] = useState<ShowDeviceOrOfficerData>({
		showDeviceOrOfficer: 'devices'
	});

	const updateShowDeviceOrOfficerData = (data: Partial<ShowDeviceOrOfficerData>) => {
		setShowDeviceOrOfficerData({ ...showDeviceOrOfficerData, ...data });
	};

	const [showOfficerImageOrStatusData, setShowOfficerImageOrStatusData] = useState<ShowOfficerImageOrStatusData>({
		showOfficerImageOrStatus: 'image'
	});

	const updateOfficerImageOrStatusData = (data: Partial<ShowOfficerImageOrStatusData>) => {
		setShowOfficerImageOrStatusData({ ...showOfficerImageOrStatusData, ...data });
	};

	return (
		<ShowDeviceOrOfficerContext.Provider
			value={{
				showDeviceOrOfficerData,
				updateShowDeviceOrOfficerData,
				showOfficerImageOrStatusData,
				updateOfficerImageOrStatusData
			}}
		>
			{children}
		</ShowDeviceOrOfficerContext.Provider>
	);
};
