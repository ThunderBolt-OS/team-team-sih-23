import { Chip, Theme } from '@mui/material';

interface WeaponsListProps {
	weapons?: string;
}

const WeaponList: React.FC<WeaponsListProps> = ({ weapons }) => {
	if (!weapons) return null;

	const weaponArray = weapons.split(',');

	return (
		<div>
			{weaponArray.map((weapon, index) => (
				<Chip
					key={index}
					label={weapon.trim()}
					variant='outlined'
					style={{ margin: '2px' }}
					sx={{
						borderColor: (theme: Theme) => theme.palette.primary.main,
						color: (theme: Theme) => theme.palette.primary.main,
						bgcolor: (theme: Theme) => theme.palette.primary[50]
					}}
				/>
			))}
		</div>
	);
};

export default WeaponList;
