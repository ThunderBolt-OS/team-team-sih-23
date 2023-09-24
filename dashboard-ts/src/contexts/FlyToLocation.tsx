import React, { createContext, useState } from 'react';

interface FlyToLocationContextProps {
	latitude: number;
	longitude: number;
	zoom: number;
}

interface FlyToLocationDataContextProps {
	flyToLocationData: FlyToLocationContextProps;
	updateFlyToLocationData: (data: Partial<FlyToLocationContextProps>) => void;
}

export const FlyToLocationDataContext = createContext<FlyToLocationDataContextProps>({
	flyToLocationData: {
		latitude: 0,
		longitude: 0,
		zoom: 0
	},
	updateFlyToLocationData: () => {}
});

export const FlyToLocationDataProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [flyToLocationData, setFlyToLocationData] = useState<FlyToLocationContextProps>({
		latitude: 0,
		longitude: 0,
		zoom: 0
	});

	const updateFlyToLocationData = (data: Partial<FlyToLocationContextProps>) => {
		console.log('updateFlyToLocationData', data);
		setFlyToLocationData({
			...flyToLocationData,
			...data
		});
	};

	const contextValue: FlyToLocationDataContextProps = {
		flyToLocationData,
		updateFlyToLocationData
	};

	return <FlyToLocationDataContext.Provider value={contextValue}>{children}</FlyToLocationDataContext.Provider>;
};
