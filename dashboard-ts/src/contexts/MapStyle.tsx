// context to store the map style
import React, { createContext, useState } from 'react';

interface MapStyleContextProps {
	mapStyle: string;
	// mapImage: string;
}

interface MapStyleDataContextProps {
	mapStyleData: MapStyleContextProps;
	updateMapStyleData: (data: Partial<MapStyleContextProps>) => void;
}

export const MapStyleDataContext = createContext<MapStyleDataContextProps>({
	mapStyleData: {
		mapStyle: 'mapbox://styles/mapbox/outdoors-v12'
		// mapImage: 'public/MapStylesImages/outdoor.png'
	},
	updateMapStyleData: () => {}
});

export const MapStyleDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [mapStyleData, setMapStyleData] = useState<MapStyleContextProps>({
		mapStyle: 'mapbox://styles/mapbox/outdoors-v12'
		// mapImage: 'public/MapStylesImages/outdoor.png'
	});

	const updateMapStyleData = (data: Partial<MapStyleContextProps>) => {
		setMapStyleData({
			...mapStyleData,
			...data
		});
	};

	const contextValue: MapStyleDataContextProps = {
		mapStyleData,
		updateMapStyleData
	};

	return <MapStyleDataContext.Provider value={contextValue}>{children}</MapStyleDataContext.Provider>;
};
