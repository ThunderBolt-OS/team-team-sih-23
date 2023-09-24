import { createContext, useState, ReactNode, useEffect } from 'react';
import { SocketMessageType } from '../components/Dashboard/Map/OfficersWithAssignedLocations/OfficerLocation/OfficerLocation';

interface OfficerLocationType {
	latitude: number;
	longitude: number;
	isPointInsidePolygon: boolean;
}

interface HighlightContextType {
	highlightOfficerWithId: number | null;
	setHighlightOfficerWithId: React.Dispatch<React.SetStateAction<number | null>>;

	highlightDeviceWithId: number | null;
	setHighlightDeviceWithId: React.Dispatch<React.SetStateAction<number | null>>;

	officerLocationFromId: Record<number, OfficerLocationType>;
	setOfficerLocationFromId: React.Dispatch<React.SetStateAction<Record<number, OfficerLocationType>>>;
}

export const HighlightContext = createContext<HighlightContextType>({
	highlightOfficerWithId: null,
	setHighlightOfficerWithId: () => { },

	highlightDeviceWithId: null,
	setHighlightDeviceWithId: () => { },

	officerLocationFromId: {},
	setOfficerLocationFromId: () => { }
});

interface HighlightProviderProps {
	children: ReactNode;
}

const HighlightProvider = ({ children }: HighlightProviderProps) => {
	const [highlightOfficerWithId, setHighlightOfficerWithId] = useState<number | null>(null);
	const [highlightDeviceWithId, setHighlightDeviceWithId] = useState<number | null>(null);

	const [officerLocationFromId, setOfficerLocationFromId] = useState<Record<number, OfficerLocationType>>({});

	useEffect(() => {
		console.log(officerLocationFromId);
	}, [officerLocationFromId]);

	return (
		<HighlightContext.Provider
			value={{
				highlightOfficerWithId,
				setHighlightOfficerWithId,

				highlightDeviceWithId,
				setHighlightDeviceWithId,

				officerLocationFromId,
				setOfficerLocationFromId
			}}
		>
			{children}
		</HighlightContext.Provider>
	);
};

export default HighlightProvider;
