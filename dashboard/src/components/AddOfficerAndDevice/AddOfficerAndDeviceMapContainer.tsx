import { useState, useContext, useEffect } from 'react';
import { Layer, Map, Marker, Source } from 'react-map-gl';
import { defaultInitialView, mapBoxGLAccessToken } from '../../constants';
import { StepperFormDataContext } from '../../contexts/StepperFormData';
import BandobasArea from '../Dashboard/Map/BandobasArea/BandobasArea';
import BaseRadius from './BaseRadius';
import CreatePolygon from './CreatePolygon';
import AddMarker from './AddMarker';
import { Box, useTheme } from '@mui/material';
import '../../App.css';
import { MapStyleDataContext } from '../../contexts/MapStyle';
import { AddOfficerAndDeviceContext } from '../../contexts/AddOfficerAndDevice';
import MapStyleButton from '../Dashboard/Map/MapStyles/MapStyleButton';

type Props = {};

const StepperMapContainer = (_props: Props) => {
	// const { formData, updateAddOfficerAndDeviceFormData } = useContext(StepperFormDataContext);
	// const { addOfficerAndDeviceMapData, addOfficerAndDeviceData, stepperStep } = formData;
	const { addOfficerAndDeviceFormData, updateAddOfficerAndDeviceFormData } = useContext(AddOfficerAndDeviceContext);
	const { addOfficerAndDeviceData, addOfficerAndDeviceMapData } = addOfficerAndDeviceFormData;

	const [bandobastId, setBandobastId] = useState<number | null>(null);
	const { mapStyleData } = useContext(MapStyleDataContext);

	const theme = useTheme();

	useEffect(() => {
		if (bandobastId) {
			localStorage.setItem('bandobastId', JSON.stringify(bandobastId));
		}
	}, [bandobastId]);

	const handleMapClick = (e: any) => {
		const latitude = e.lngLat.lat;
		const longitude = e.lngLat.lng;
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceMapData: {
				...addOfficerAndDeviceMapData,
				latitude: latitude,
				longitude: longitude
			},
			addOfficerAndDeviceData: {
				...addOfficerAndDeviceData,
				latitude: latitude,
				longitude: longitude
			}
		});
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
				onClick={handleMapClick}
			>
				<>
					<Box>
						<MapStyleButton />
					</Box>
					<BandobasArea setBandobastId={setBandobastId} />

					{addOfficerAndDeviceData.fenceOption === 'No Fence' && <AddMarker />}

					{addOfficerAndDeviceData.fenceOption === 'Pt Fence' &&
						addOfficerAndDeviceData.geoFenceRadius !== 0 && (
							<BaseRadius radius={addOfficerAndDeviceData.geoFenceRadius} />
						)}

					{addOfficerAndDeviceData.fenceOption === 'Poly Fence' && <CreatePolygon />}

					{/* if geojson created in polyfence then add the marker */}
					{addOfficerAndDeviceData.fenceOption === 'Poly Fence' && addOfficerAndDeviceData.circleGeoJson && (
						<AddMarker />
					)}
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
	height: 450,
	width: 450,
	borderRadius: 13,
	border: '1px solid #dde6ef'
};

export default StepperMapContainer;
