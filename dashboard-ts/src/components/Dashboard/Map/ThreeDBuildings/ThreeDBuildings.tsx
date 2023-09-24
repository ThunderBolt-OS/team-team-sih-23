import { Layer, Source } from 'react-map-gl';
import { MapStyleDataContext } from '../../../../contexts/MapStyle';
import { useContext } from 'react';

type Props = {};

const ThreeDBuildings = (_props: Props) => {
	const { mapStyleData } = useContext(MapStyleDataContext);

	return (
		<Source
			id='composite'
			type='vector'
			url={`${mapStyleData.mapStyle}`}
		>
			<Layer
				id='add-3d-buildings'
				source='composite'
				source-layer='building'
				filter={['==', 'extrude', 'true']}
				type='fill-extrusion'
				// minZoom={15}
				paint={{
					'fill-extrusion-color': '#aaa',
					'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
					'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
					'fill-extrusion-opacity': 0.6
				}}
			/>
		</Source>
	);
};

export default ThreeDBuildings;
