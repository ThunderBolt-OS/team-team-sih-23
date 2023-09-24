import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MapIcon from '@mui/icons-material/Map';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';

const withLink = (to: string, children: React.ReactNode) => <Link to={to}>{children}</Link>;

type Action = {
	icon: React.ReactNode;
	tooltip: string;
};

const actions: Action[] = [
	{
		icon: withLink('/create-bandobast/', <MapIcon />),
		tooltip: 'New Bandobast'
	}
	// {
	// 	icon: withLink('/dashboard/add-device/', <TapAndPlayIcon />),
	// 	tooltip: 'Add Device'
	// }
];

const FloatingActionMenu: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box sx={{ position: 'absolute', bottom: 1, right: 20, flexGrow: 1 }}>
			<Backdrop open={open} />
			<SpeedDial
				ariaLabel='SpeedDial tooltip'
				sx={{ position: 'absolute', bottom: 16, right: 12 }}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
			>
				{actions.map(action => (
					<SpeedDialAction
						key={action.tooltip}
						icon={action.icon}
						tooltipTitle={action.tooltip}
						sx={{
							'.MuiTooltip-popper': {
								maxWidth: '100%',
								width: '100%'
							}
						}}
						tooltipOpen
						onClick={handleClose}
					/>
				))}
			</SpeedDial>
		</Box>
	);
};

export default FloatingActionMenu;
