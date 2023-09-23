import React from 'react';
import { styled, Theme, MenuItem } from '@mui/material';

// Define the type for the theme object.
interface StyledMenuItemProps {
	theme: Theme;
}

// Create the styled MenuItem component.
const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>(({ theme }) => ({
	color: theme.palette.primary.main,
	'&:hover': {
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.primary.dark,
		borderRadius: 5
	}
	// '&.Mui-selected': {
	// 	backgroundColor: theme.palette.primary.light,
	// 	color: theme.palette.primary.dark,
	// 	borderRadius: 5
	// }
}));

export default StyledMenuItem;
