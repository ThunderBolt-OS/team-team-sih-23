import React, { useContext } from 'react';
import { StepperFormDataContext } from '../../contexts/StepperFormData';
import { Marker } from 'react-map-gl';

const AddMarker = () => {
	const { formData, updateFormData } = useContext(StepperFormDataContext);
	const { mapData, step3Data } = formData;
	console.log('mapData', mapData);
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
	};

	return  (
		<Marker
			longitude={Number(mapData?.longitude ? mapData?.longitude : 0)}
			latitude={Number(mapData?.latitude ? mapData?.latitude : 0)}
			anchor='bottom'
			draggable={true}
			onDragEnd={handleMapClick}
		>
			<img
				src='/pin.png'
				style={{
					width: '36px'
				}}
			/>
		</Marker>
	);
};

export default AddMarker;
