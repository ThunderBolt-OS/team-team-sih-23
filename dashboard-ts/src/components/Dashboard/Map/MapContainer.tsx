import { Box, CircularProgress } from '@mui/material';
import { useState, useContext, useEffect, useRef, MutableRefObject } from 'react';
import { Map, MapRef, Marker } from 'react-map-gl';
import FlyToInterpolator, { ViewState } from 'react-map-gl';
import { defaultInitialView, mapBoxGLAccessToken } from '../../../constants';
import BandobasArea from './BandobasArea/BandobasArea';
import OfficersWithAssignedLocations from './OfficersWithAssignedLocations/OfficerWithAssignedLocation';
import MapBar from './MapBar/MapBar';
import '../../../App.css';
import { MapStyleDataContext } from '../../../contexts/MapStyle';
import MapStyleButton from './MapStyles/MapStyleButton';
import FloatingActionMenu from './FloatingActionMenu/FloatingActionMenu';
import { FlyToLocationDataContext } from '../../../contexts/FlyToLocation';
import { ErrorBoundary } from 'react-error-boundary';
import ThreeDBuildings from './ThreeDBuildings/ThreeDBuildings';
import SidebarProvider from '../../../contexts/SidebarContext';
import SearchMap from '../../Stepper/SearchMap';
import BaseRadius from '../../Stepper/BaseRadius';
// Contexts
import StopsContext from '../../../contexts/StopsContext';
import BusRoutesContext from '../../../contexts/BusRoutesContext';
import { createSocket } from '../../../utils/socketFactory';
import CustomMarker from '../../BusMapContainer/CustomMarker';


const policeLatLongs = [
	{ latitude: 19.100343, longitude: 72.898441 },
	{ latitude: 19.101477, longitude: 72.898682 },
	{ latitude: 19.102134, longitude: 72.89894 },
	{ latitude: 19.10285, longitude: 72.89891 },
	{ latitude: 19.103296, longitude: 72.897373 },
	{ latitude: 19.103782, longitude: 72.896358 },
	{ latitude: 19.104119, longitude: 72.896667 },
	{ latitude: 19.104767, longitude: 72.896757 },
	{ latitude: 19.104196, longitude: 72.896015 },
	{ latitude: 19.105063, longitude: 72.895558 }
];

type Props = {};

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



const MapContainer = (_props: Props) => {
	const [openPoliceInfo, setOpenPoliceInfo] = useState(false);
	const [assignedPosition, setAssignedPosition] = useState(true);
	const [bandobastId, setBandobastId] = useState<number | null>(null);
	const [clearState, setClearState] = useState(0);

	const { mapStyleData } = useContext(MapStyleDataContext);
	const { flyToLocationData } = useContext(FlyToLocationDataContext);

	var mapRef = useRef<MutableRefObject<MapRef | null>>(null);

	const stopsContext = useContext(StopsContext);
	const busRoutesContext = useContext(BusRoutesContext);

	const [ready, setReady] = useState(false);
	const [trips, setTrips] = useState<number[]>([]);
	const [busLocations, setBusLocations] = useState<BusLocations>({});
	// const [stopLocations, setStopLocations] = useState<StopLocations>({});

	// initial state on the map
	const mapInitialViewState: ViewState = {
		...defaultInitialView,
		bearing: 0,
		pitch: 0,
		padding: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		}
	};

	const handleMoveToFixedLocation = (fixedLongitude: number, fixedLatitude: number) => {
		// Access the map object via a ref and use the flyTo() method
		if (mapRef === null) return;
		// @ts-ignore
		const map = mapRef.getMap();
		if (map) {
			map.flyTo({
				center: [fixedLongitude, fixedLatitude], // Replace with the fixed longitude and latitude
				zoom: 20, // Adjust the zoom level as needed
				speed: 1.6 // Adjust the fly speed
			});
		}
	};

	// Use useEffect to trigger the flyTo function when latitude and longitude change
	useEffect(() => {
		// console.log('flyToLocationData', flyToLocationData);
		handleMoveToFixedLocation(flyToLocationData.longitude, flyToLocationData.latitude);
	}, [flyToLocationData]);

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
					mapStyle={`${mapStyleData.mapStyle}`}
					// @ts-ignore
					projection='globe'
					mapboxAccessToken={mapBoxGLAccessToken}
					renderWorldCopies={false}
					onClick={() => {
						setClearState(prev => prev + 1);
					}}
					attributionControl={false}
					// @ts-ignore
					ref={map => (mapRef = map)}
				>
					<>
						<ThreeDBuildings />
						<Box sx={{ position: 'relative', top: '5' }}>
							<MapBar bandobastId={bandobastId} />
						</Box>

						<Box sx={{ position: 'relative', bottom: '5' }}>
							<SearchMap
								callbackLoc={(latitude: number, longitude: number) => {
									handleMoveToFixedLocation(longitude, latitude);
								}}
								mapboxToken={mapBoxGLAccessToken}
								clearState={clearState}
							/>
						</Box>

						<Box>
							<MapStyleButton />
						</Box>

						{/* <Box>
							<FloatingActionMenu />
						</Box> */}

						<BandobasArea setBandobastId={setBandobastId} />

						<SidebarProvider>
							{bandobastId && <OfficersWithAssignedLocations bandobastId={bandobastId} />}
						</SidebarProvider>
						{[
							[19.0771110952482, 72.90933586533657],
							[19.078524457476057, 72.91072873455373],
							[19.075215670322585, 72.912683031382],
							[19.07457652881865, 72.90316256245599]
						].map(val => {
							return (
								<Marker
									latitude={val[0]}
									longitude={val[1]}
									style={markerStyle}
									onClick={() => {
										setAssignedPosition(false);
										setOpenPoliceInfo(true);
									}}
								>
									<img
										src='/bus-stop.png'
										width={30}
										alt='Bus Stand'
									/>
									<BaseRadius
										latitude={val[0]}
										longitude={val[1]}
										radius={40}
									/>
								</Marker>
							);
						})}

						<>
							{Object.values(busLocations).map((loc, i) => (
								<CustomMarker
									key={i}
									type='bus'
									lat={loc.lat}
									lon={loc.lon}
									// onClick={() => {
									// 	handleBusMarkerClick(i * 100);
									// }}
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
						{/* <Marker
							latitude={19.104119}
							longitude={72.898667}
							style={markerStyle}
							onClick={() => {
								setAssignedPosition(false);
								setOpenPoliceInfo(true);
							}}
						>
							<div style={{ position: 'relative' }}>
								<img
									style={{ position: 'absolute' }}
									src='/officer2.png'
									width={30}
									alt='Police Marker'
								/>
								<img
									style={{
										position: 'absolute',
										marginTop: 10,
										marginLeft: 10
									}}
									src='/warning.png'
									width={30}
									alt='Warning Marker'
								/>
							</div>
						</Marker> */}
					</>
				</Map>

				{/* <PoliceInfoSidebarProfile
				open={true}
				setOpen={setOpenPoliceInfo}
				assignedPosition={assignedPosition}
				setAssignedPosition={setAssignedPosition}
				officerId={2}
			/> */}
			</ErrorBoundary>
		</>
	);
};

const markerStyle = {
	cursor: 'pointer'
};

const mapContainerStyles = {
	height: '82vh',
	width: '100%',
	borderTopLeftRadius: '0px',
	borderTopRightRadius: '0px',
	borderBottomRightRadius: '13px',
	borderBottomLeftRadius: '13px'
};

export default MapContainer;
