import { Box, Theme, useTheme } from '@mui/material';

interface CustomSquareIconButtonProps {
	children: React.ReactNode;
	href: string;
	component?: React.ElementType;
}

const PoliceInfoSquareIconBtn: React.FC<CustomSquareIconButtonProps> = ({ children, href, component }) => {
	const theme = useTheme<Theme>();
	return (
		<Box
			component='a'
			href={href}
			sx={{
				width: 40,
				height: 40,
				borderRadius: 1.6,
				backgroundColor: theme.palette.primary[100],
				color: theme.palette.primary.dark,
				'&:hover': {
					backgroundColor: theme.palette.primary.dark,
					color: theme.palette.primary.contrastText
				},
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{children}
		</Box>
	);
};

export default PoliceInfoSquareIconBtn;
