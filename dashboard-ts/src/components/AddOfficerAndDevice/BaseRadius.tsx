import React, { useContext } from 'react';
import { Layer, Map, Marker, Source } from 'react-map-gl';
import { StepperFormDataContext } from '../../contexts/StepperFormData';
import { Point, Feature, FeatureCollection, Geometry } from 'geojson';
import AddMarker from './AddMarker';
import { AddOfficerAndDeviceContext } from '../../contexts/AddOfficerAndDevice';

interface Props {
	radius?: number;
}

function createCircle(lat: number, lon: number, radius: number): FeatureCollection<Geometry, any> {
	const center: Point = {
		type: 'Point',
		coordinates: [lon, lat]
	};

	const steps = 64; // Number of steps to create a smooth circle
	const coordinates: number[][] = [];

	for (let i = 0; i <= steps; i++) {
		const angle = (i / steps) * Math.PI * 2;
		const dx = Math.cos(angle) * radius;
		const dy = Math.sin(angle) * radius;
		const lngLat: number[] = [center.coordinates[0] + dx / 111320, center.coordinates[1] + dy / 111320];
		coordinates.push(lngLat);
	}

	const circle: Feature<Geometry> = {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [coordinates]
		}
	};

	return {
		type: 'FeatureCollection',
		features: [circle]
	};
}

const BaseRadius = ({ radius }: Props) => {
	// const { formData } = React.useContext(StepperFormDataContext);
	// const { addOfficerAndDeviceMapData } = formData;
	const { addOfficerAndDeviceFormData, updateAddOfficerAndDeviceFormData } = useContext(AddOfficerAndDeviceContext);
	const { addOfficerAndDeviceData, addOfficerAndDeviceMapData } = addOfficerAndDeviceFormData;

	const longitude = Number(addOfficerAndDeviceMapData?.longitude ? addOfficerAndDeviceMapData?.longitude : 0);
	const latitude = Number(addOfficerAndDeviceMapData?.latitude ? addOfficerAndDeviceMapData?.latitude : 0);

	return (
		<>
			<AddMarker />
			<Source
				type='geojson'
				data={createCircle(latitude, longitude, radius ? radius : 0)}
			>
				<Layer
					type='fill'
					paint={{
						'fill-color': '#00ff00',
						'fill-opacity': 0.2
					}}
				/>
			</Source>
		</>
	);
};

export default BaseRadius;
