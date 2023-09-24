import React, { useState, useCallback, useContext } from 'react';
import DrawControl from '../Map/DrawControl';
import ControlPanel from '../Map/ControlPanel';
import { StepperFormDataContext } from '../../contexts/StepperFormData';
import AddMarker from './AddMarker';

const CreatePolygon = () => {
	const [polygonCoordinates, setPolygonCoordinates] = useState<any>(null);
	const [features, setFeatures] = useState({});
	const { formData, updateFormData } = useContext(StepperFormDataContext);
	const { mapData, step3Data, stepperStep } = formData;

	const onUpdate = useCallback((e: any) => {
		setFeatures(currFeatures => {
			const newFeatures: any = { ...currFeatures };
			for (const f of e.features) {
				newFeatures[f.id] = f;
			}
			return newFeatures;
		});
	}, []);

	const onDelete = useCallback((e: any) => {
		setFeatures(currFeatures => {
			const newFeatures: any = { ...currFeatures };
			for (const f of e.features) {
				delete newFeatures[f.id];
			}
			return newFeatures;
		});
	}, []);

	const handleDrawCreate = useCallback((event: any) => {
		const polygon = event.features[0].geometry.coordinates[0];
		setPolygonCoordinates(polygon);
		updateFormData({
			mapData: {
				...mapData,
				polygonCoordinates: polygon
			}
		});

		if (stepperStep.activeStep === 2 && step3Data.fenceOption === 'Poly Fence') {
			updateFormData({
				step3Data: {
					...step3Data,
					circleGeoJson: polygon
				}
			});
			// console.log('polygon', polygon);
		}
	}, []);

	return (
		<>
			<DrawControl
				position='top-left'
				displayControlsDefault={false}
				controls={{
					polygon: true,
					trash: true
				}}
				defaultMode='draw_polygon'
				onCreate={(e: any) => {
					onUpdate;
					handleDrawCreate(e);
				}}
				onUpdate={onUpdate}
				onDelete={onDelete}
			/>
			<ControlPanel polygons={Object.values(features)} />
		</>
	);
};

export default CreatePolygon;
