import React, { useContext } from 'react';
import { StepperFormDataContext } from '../../contexts/StepperFormData';
import { Marker } from 'react-map-gl';
import { AddOfficerAndDeviceContext } from '../../contexts/AddOfficerAndDevice';

const AddMarker = () => {
	// const { formData, updateAddOfficerAndDeviceFormData } = useContext(StepperFormDataContext);
	// const { addOfficerAndDeviceMapData, step3Data } = formData;
	const { addOfficerAndDeviceFormData, updateAddOfficerAndDeviceFormData } = useContext(AddOfficerAndDeviceContext);
	const { addOfficerAndDeviceData, addOfficerAndDeviceMapData } = addOfficerAndDeviceFormData;

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
		<Marker
			longitude={Number(addOfficerAndDeviceMapData?.longitude ? addOfficerAndDeviceMapData?.longitude : 0)}
			latitude={Number(addOfficerAndDeviceMapData?.latitude ? addOfficerAndDeviceMapData?.latitude : 0)}
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
