import React, { useContext } from 'react';
import { Box, FormControl, InputLabel, Select, SelectChangeEvent, useTheme } from '@mui/material';
import { StepperFormDataContext } from '../../contexts/StepperFormData';
import StyledMenuItem from '../../components/Custom/StyledMenuItem';

const securityCovers = [
	{
		value: 'SPG',
		label: 'SPG',
		markerBaseRadius: 500
	},
	{
		value: 'Z+',
		label: 'Z+',
		markerBaseRadius: 240
	},
	{
		value: 'Z',
		label: 'Z',
		markerBaseRadius: 120
	},
	{
		value: 'Y+',
		label: 'Y+',
		markerBaseRadius: 90
	},
	{
		value: 'Y',
		label: 'Y',
		markerBaseRadius: 70
	},
	{
		value: 'X',
		label: 'X',
		markerBaseRadius: 30
	}
];

const Step1Form: React.FC = () => {
	const { formData, updateFormData } = useContext(StepperFormDataContext);
	const { step2Data, mapData } = formData;
	const theme = useTheme();

	const handleChange = (e: SelectChangeEvent<string>) => {
		const { value } = e.target;

		// Find the selected security cover object
		const selectedSecurityCover = securityCovers.find(cover => cover.value === value);

		if (selectedSecurityCover) {
			const { markerBaseRadius } = selectedSecurityCover;

			updateFormData({
				step2Data: { ...step2Data, securityCover: value },
				mapData: { ...mapData, markerBaseRadius: markerBaseRadius }
			});
		}
	};

	return (
		<Box>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Security Cover</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={step2Data.securityCover}
					label='Security Cover'
					onChange={handleChange}
				>
					{securityCovers.map((securityCover, index) => (
						<StyledMenuItem
							theme={theme}
							key={index}
							value={securityCover.value}
						>
							{securityCover.label}
						</StyledMenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default Step1Form;
