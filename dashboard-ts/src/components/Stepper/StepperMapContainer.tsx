import { useState, useContext, useEffect, useRef, MutableRefObject } from 'react';
import { Layer, Map, MapRef, Marker, Source } from 'react-map-gl';
import { defaultInitialView, mapBoxGLAccessToken } from '../../constants';
import { StepperFormDataContext } from '../../contexts/StepperFormData';
import BandobasArea from '../Dashboard/Map/BandobasArea/BandobasArea';
import BaseRadius from './BaseRadius';
import CreatePolygon from './CreatePolygon';
import AddMarker from './AddMarker';
import { Box, useTheme } from '@mui/material';
import '../../App.css';
import { MapStyleDataContext } from '../../contexts/MapStyle';
import MapStyleButton from '../Dashboard/Map/MapStyles/MapStyleButton';
import SearchMap from './SearchMap';
import { FlyToLocationDataContext } from '../../contexts/FlyToLocation';

type Props = {};

const StepperMapContainer = (_props: Props) => {
	const { formData, updateFormData } = useContext(StepperFormDataContext);
	const { mapData, step3Data, stepperStep } = formData;
	const [bandobastId, setBandobastId] = useState<number | null>(null);
	const { mapStyleData } = useContext(MapStyleDataContext);

	const [clearState, setClearState] = useState(0);

	var mapRef = useRef<MutableRefObject<MapRef | null>>(null);

	const { flyToLocationData } = useContext(FlyToLocationDataContext);

	const theme = useTheme();

	const handleMoveToFixedLocation = (fixedLongitude: number, fixedLatitude: number) => {
		// Access the map object via a ref and use the flyTo() method
		if (mapRef === null) return;
		// @ts-ignore
		const map = mapRef.getMap();
		if (map) {
			map.flyTo({
				center: [fixedLongitude, fixedLatitude], // Replace with the fixed longitude and latitude
				zoom: 15, // Adjust the zoom level as needed
				speed: 1.6 // Adjust the fly speed
			});
		}
	};

	// Use useEffect to trigger the flyTo function when latitude and longitude change
	useEffect(() => {
		console.log('flyToLocationData', flyToLocationData);
		handleMoveToFixedLocation(flyToLocationData.longitude, flyToLocationData.latitude);
	}, [flyToLocationData]);

	useEffect(() => {
		if (bandobastId) {
			localStorage.setItem('bandobastId', JSON.stringify(bandobastId));
		}
	}, [bandobastId]);

	const handleMapClick = (e: any) => {
		const latitude = e.lngLat.lat;
		const longitude = e.lngLat.lng;
		updateFormData({
			mapData: {
				...mapData,
				latitude: latitude,
				longitude: longitude
			},
			step3Data: {
				...step3Data,
				latitude: latitude,
				longitude: longitude
			}
		});

		setClearState(prev => prev + 1);
	};

	return (
		<>
			<Map
				initialViewState={mapInitialViewState}
				style={mapContainerStyles}
				mapStyle={`${mapStyleData.mapStyle}`}
				// projection="globe" //!need help with this
				mapboxAccessToken={mapBoxGLAccessToken}
				renderWorldCopies={false}
				attributionControl={false}
				onClick={
					stepperStep.activeStep === 2
						? handleMapClick
						: stepperStep.activeStep === 1
							? handleMapClick
							: () => {
								setClearState(prev => prev + 1);
							}
				}
				// @ts-ignore
				ref={map => (mapRef = map)}
			>
				<>
					<Box>
						<MapStyleButton />
					</Box>
					<BandobasArea setBandobastId={setBandobastId} />

					<SearchMap
						mapboxToken={mapBoxGLAccessToken}
						callbackLoc={(lat, lng) => {
							handleMoveToFixedLocation(lng, lat);
						}}
						clearState={clearState}
					/>

					{/* if the stepperStep has value 1 then render polygon, if 2 then render base radius and if 3 render addmarker */}
					{stepperStep.activeStep === 0 && <CreatePolygon />}
					{stepperStep.activeStep === 1 && <BaseRadius radius={mapData?.markerBaseRadius} />}

					{stepperStep.activeStep === 2 && step3Data.fenceOption === 'No Fence' && <AddMarker />}

					{stepperStep.activeStep === 2 &&
						step3Data.fenceOption === 'Pt Fence' &&
						step3Data.geoFenceRadius !== 0 && <BaseRadius radius={step3Data.geoFenceRadius} />}

					{stepperStep.activeStep === 2 && step3Data.fenceOption === 'Poly Fence' && <CreatePolygon />}

					{/* if geojson created in polyfence then add the marker */}
					{stepperStep.activeStep === 2 &&
						step3Data.fenceOption === 'Poly Fence' &&
						step3Data.circleGeoJson && <AddMarker />}

					{/* {stepperStep.activeStep === 2 &&
						(() => {
							const latitude = step3Data.latitude;
							const longitude = step3Data.longitude;

							const renderAddMarker = position => {
								return (
									position.coords.latitude === latitude &&
									position.coords.longitude === longitude && <AddMarker />
								);
							};

							if (navigator.geolocation) {
								navigator.geolocation.getCurrentPosition(renderAddMarker);
							}
						})()} */}
				</>
			</Map>
		</>
	);
};

const markerStyle = {
	cursor: 'pointer'
};

// initial state on the map
const mapInitialViewState = defaultInitialView;

export const mapContainerStyles = {
	// marginLeft: '100px',
	height: 500,
	width: 500,
	borderRadius: 13,
	border: '1px solid #dde6ef'
};

export default StepperMapContainer;
