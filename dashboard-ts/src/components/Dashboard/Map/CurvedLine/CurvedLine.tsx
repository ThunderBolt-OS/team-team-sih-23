import { Layer, Source } from 'react-map-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { ErrorBoundary } from 'react-error-boundary';

type Props = {
	id: string;

	sourceLat: number;
	sourceLon: number;

	destLat: number;
	destLon: number;
};

const CurvedLine = ({ sourceLat, sourceLon, destLat, destLon, id }: Props) => {
	return (
		<ErrorBoundary fallback={<div></div>}>
			{/* Add the curved line to the map */}
			{sourceLat && sourceLon && destLat && destLon && (
				<Source
					id={`polylineLayer-${id}`}
					type='geojson'
					data={{
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'LineString',
							coordinates: [
								[sourceLon, sourceLat],
								[destLon, destLat]
							]
						}
					}}
				>
					<Layer
						id={`lineLayer-${id}`}
						type='line'
						source='my-data'
						layout={{
							'line-join': 'round',
							'line-cap': 'round'
						}}
						paint={{
							'line-color': 'red',
							'line-width': 2
						}}
					/>
				</Source>
			)}
		</ErrorBoundary>
	);
};

export default CurvedLine;
