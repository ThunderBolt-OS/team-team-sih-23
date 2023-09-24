
// Third-party components
import { Marker } from 'react-map-gl';

interface CustomMarkerProps {
	type: 'bus' | 'stop';
	lat: number;
	lon: number;
	onClick?: () => void;
}

function CustomMarker(props: CustomMarkerProps) {
	return (
		<Marker
			latitude={props.lat}
			longitude={props.lon}
		>
			<MarkerBody type={props.type} />
		</Marker>
	);
}

interface MarkerBodyProps {
	type: 'bus' | 'stop';
}

function MarkerBody(props: MarkerBodyProps) {
	if (props.type === 'bus')
		return (
			<img
				src={'/mapIcons/bus.png'}
				width={30}
			/>
		);
	else
		return (
			<img
				src={'/mapIcons/stop.png'}
				width={30}
			/>
		);
}

export default CustomMarker;
