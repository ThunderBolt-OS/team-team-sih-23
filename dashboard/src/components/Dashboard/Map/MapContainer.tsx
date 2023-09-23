import { Box } from '@mui/material';
import { useState, useContext, useEffect, useRef, MutableRefObject } from 'react';
import { Map, MapRef } from 'react-map-gl';
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

const MapContainer = (_props: Props) => {
	const [openPoliceInfo, setOpenPoliceInfo] = useState(false);
	const [assignedPosition, setAssignedPosition] = useState(true);
	const [bandobastId, setBandobastId] = useState<number | null>(null);
	const [clearState, setClearState] = useState(0);

	const { mapStyleData } = useContext(MapStyleDataContext);
	const { flyToLocationData } = useContext(FlyToLocationDataContext);

	var mapRef = useRef<MutableRefObject<MapRef | null>>(null);

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
	height: '62vh',
	width: '100%',
	borderRadius: 13
};

export default MapContainer;
