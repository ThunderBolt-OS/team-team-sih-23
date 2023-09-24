// Styles
import 'mapbox-gl/dist/mapbox-gl.css';

// React
import { useState, useEffect, useContext } from 'react';
// import {useRef, MutableRefObject } from "react";

// MUI
import { Box, CircularProgress } from '@mui/material';

// Third-party components
import { ErrorBoundary } from 'react-error-boundary';
import { Map } from 'react-map-gl';
// import { MapRef } from "react-map-gl";
import { ViewState } from 'react-map-gl';

// Our components
import CustomMarker from './CustomMarker';

// Our Libraries
import { createSocket } from '../../utils/socketFactory';

// Contexts
import StopsContext from '../../contexts/StopsContext';
import BusRoutesContext from '../../contexts/BusRoutesContext';

// Hooks
import { useNavigate } from 'react-router-dom';

// Config
import { MAPBOX_ACCESS_TOKEN } from '../../config/constants';

interface WebsocketData {
	type: 'init_location_update' | 'location_update';
	data: {
		latitude: string;
		longitude: string;
	};
}

type BusLocations = Record<
	number,
	{
		lat: number;
		lon: number;
	}
>;

type StopLocations = Record<
	number,
	{
		lat: number;
		lon: number;
	}
>;

interface LiveAreaMapProps {
	onBusSelected: (selectionDetails: any) => {};
	onStopSelected: (selectionDetails: any) => {};
}

const LiveAreaMap = (props: LiveAreaMapProps) => {
	// let mapRef = useRef<MutableRefObject<MapRef | null>>(null);
	const stopsContext = useContext(StopsContext);
	const busRoutesContext = useContext(BusRoutesContext);

	// const mockBuses: BusLocations = {
	//   1: { lat: 19.100343, lon: 72.898441 },
	//   2: { lat: 19.101477, lon: 72.898682 },
	//   3: { lat: 19.102134, lon: 72.89894 },
	//   4: { lat: 19.10285, lon: 72.89891 },
	//   5: { lat: 19.103296, lon: 72.897373 },
	//   6: { lat: 19.103782, lon: 72.896358 },
	//   7: { lat: 19.104119, lon: 72.896667 },
	//   8: { lat: 19.104767, lon: 72.896757 },
	//   9: { lat: 19.104196, lon: 72.896015 },
	// };

	const [ready, setReady] = useState(false);
	const [trips, setTrips] = useState<number[]>([]);
	const [busLocations, setBusLocations] = useState<BusLocations>({});
	// const [stopLocations, setStopLocations] = useState<StopLocations>({});

	const navigate = useNavigate();

	// initial state of the map
	const mapInitialViewState: ViewState = {
		latitude: stopsContext.data[1].lat,
		longitude: stopsContext.data[1].lon,
		zoom: 17,
		bearing: 0,
		pitch: 0,
		padding: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		}
	};

	// styles
	const mapContainerStyles = {
		height: '62vh',
		width: '100%',
		borderRadius: 13
	};

	const mapStyle = 'mapbox://styles/mapbox/outdoors-v12';

	useEffect(() => {
		init();
	}, []);

	async function init() {
		// setBusLocations(mockBuses);

		// Get a list of all trips
		const updatedListOfTrips = await getListOfTrips();
		setTrips(updatedListOfTrips);
		setupWebsocketsForEachTrip(updatedListOfTrips);

		setReady(true);
	}

	async function getListOfTrips() {
		// Mock implementation
		return new Promise<number[]>(resolve => {
			setTimeout(() => {
				const tripIDs = new Array(1).fill(0).map<number>(i => i + 1);
				resolve(tripIDs);
			}, 1000);
		});
	}

	function setupWebsocketsForEachTrip(trips: number[]) {
		for (let i = 0; i < trips.length; i++) {
			const tripID = trips[i];
			const endpoint = `/ws/trip/${tripID}/`;
			const socket = createSocket(endpoint);
			socket.onmessage = e => {
				const data = JSON.parse(e.data);
				websocketEventHandler(tripID, data);
			};

			// Mock Implementation
			// setInterval(() => {
			//   websocketEventHandler(tripID, {
			//     type: "location_update",
			//     data: {
			//       latitude: "19.0735464",
			//       longitude: "72.9183035",
			//     },
			//   });
			// }, Math.random() * 1000);
		}
	}

	function websocketEventHandler(id: number, websocketData: WebsocketData) {
		// console.log(`Received event for trip id: ${id}`);
		// console.log(websocketData);
		const updatedBusLocations = busLocations;
		updatedBusLocations[id] = {
			lat: parseFloat(websocketData.data.latitude),
			lon: parseFloat(websocketData.data.longitude)
		};
		// console.log(updatedBusLocations);
		setBusLocations({ ...updatedBusLocations });
	}

	function handleBusMarkerClick(busNumber: number) {
		navigate(`/dashboard/busDetails/${busNumber}`);
	}

	if (!ready) {
		return (
			<ErrorBoundary fallback={<div></div>}>
				<Box>
					<CircularProgress />
				</Box>
			</ErrorBoundary>
		);
	}

	return (
		<>
			<ErrorBoundary fallback={<div></div>}>
				<Map
					initialViewState={mapInitialViewState}
					style={mapContainerStyles}
					mapStyle={mapStyle}
					// @ts-ignore
					projection='globe'
					mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
					renderWorldCopies={false}
					attributionControl={false}
					// @ts-ignore
					// ref={(map) => (mapRef = map)}
				>
					<>
						{Object.values(busLocations).map((loc, i) => (
							<CustomMarker
								key={i}
								type='bus'
								lat={loc.lat}
								lon={loc.lon}
								onClick={() => {
									handleBusMarkerClick(i * 100);
								}}
							/>
						))}

						{Object.values(stopsContext.data).map((loc, i) => (
							<CustomMarker
								key={i}
								type='stop'
								lat={loc.lat}
								lon={loc.lon}
							/>
						))}
					</>
				</Map>
			</ErrorBoundary>
		</>
	);
};

export default LiveAreaMap;
