import React, { useState, useContext } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, IconButton, styled, Tooltip } from '@mui/material';
import { allMapStyles } from '../../../../constants/allMapStyles';
import { MapStyleDataContext } from '../../../../contexts/MapStyle';
import { ColorLensRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import StyledMenuItem from '../../../Custom/StyledMenuItem';

interface MapStyle {
	name: string;
	value: string;
	image: string;
}

const MapStyleButton: React.FC = () => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { mapStyleData, updateMapStyleData } = useContext(MapStyleDataContext);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMapStyleChange = (value: string) => {
		// console.log('Selected Map Style:', value);
		updateMapStyleData({ mapStyle: value });
		handleClose();
	};

	return (
		<>
			<Tooltip title='Change Map Style'>
				<IconButton
					aria-controls='map-style-menu'
					aria-haspopup='true'
					onClick={handleClick}
					sx={{
						position: 'absolute',
						bottom: 20,
						left: 20,
						backgroundColor: theme.palette.primary.light,
						color: theme.palette.primary.dark,
						borderRadius: 13,
						'&:hover': {
							backgroundColor: theme.palette.primary.main,
							color: theme.palette.primary.contrastText
							// color: theme.custom.primary.primary300
						}
					}}
				>
					{/* <img src={mapStyleData.mapImage} alt="" /> */}
					<ColorLensRounded />
				</IconButton>
			</Tooltip>
			<Menu
				id='map-style-menu'
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				sx={{ overflow: 'auto' }}
			>
				{allMapStyles.map((style: MapStyle) => (
					<StyledMenuItem
						theme={theme}
						key={style.value}
						onClick={() => handleMapStyleChange(style.value)}
					>
						<ListItemIcon>
							<img
								src={style.image}
								alt={style.name}
								style={{
									width: 40,
									height: 40,
									objectFit: 'cover',
									borderRadius: 8,
									borderWidth: 4,
									borderColor: theme.palette.grey[500],
									boxShadow: `0px 0px 4px ${theme.palette.grey[500]}`,
									marginRight: 8
								}}
							/>
						</ListItemIcon>
						<ListItemText primary={style.name} />
					</StyledMenuItem>
				))}
			</Menu>
		</>
	);
};

export default MapStyleButton;
