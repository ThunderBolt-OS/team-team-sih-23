import { useContext, useEffect, useState } from 'react';
import { GET } from '../../../../api/fetch';
import { Layer, Source } from 'react-map-gl';
import { useTheme } from '@mui/material';
import { GlobalContext } from '../../../../contexts/global';
import findGeometricCenter from '../../../../utils/findGeometricCenter';

type Props = {
	setBandobastId?: React.Dispatch<React.SetStateAction<number | null>>;
};

export type BandobasResponseType = {
	server_timestamp: string;
	data: Array<{
		id: number;
		name: string;
		location_data: string;
		start_time: string;
		end_time: string;
		timestamp: string;
		locality_type: string;
		event_type: string;
		bandobast_type: string;
		police_departments: string;
		security_covers: string;
		description: string;
		created_by: number;
	}>;
};

type FilteredLocationData = Array<Array<Array<number>>>;

const BandobasArea = ({ setBandobastId }: Props) => {
	const theme = useTheme();

	const global = useContext(GlobalContext);

	const [locationData, setLocationData] = useState<FilteredLocationData>([]);

	useEffect(() => {
		(async () => {
			const apiResponse: BandobasResponseType = await GET('bandobast/');

			if (apiResponse?.data?.length > 0) {
				// TODO change data indexing location
				const bandobastId = apiResponse.data[0].id;
				// console.log('bandobastId uyoiyoiyoyo', bandobastId);
				// console.log('apiResponse', apiResponse);
				if (setBandobastId) setBandobastId(bandobastId);

				global.setBandobastId(bandobastId.toString());
				localStorage.setItem('bandobastId', bandobastId.toString());

				setLocationData(filterLocationData(apiResponse));
			}
		})();
	}, []);

	const filterLocationData = (jsonData: BandobasResponseType): FilteredLocationData => {
		return jsonData.data.map(obj => {
			const { location_data } = obj;
			if (location_data === 'null') {
				return [];
			}
			// findGeometricCenter(JSON.parse(location_data))
			localStorage.setItem('geometricCenter', JSON.stringify(findGeometricCenter(JSON.parse(location_data))));
			console.log('from local storage', localStorage.getItem('geometricCenter'));
			return JSON.parse(location_data);
		});
	};

	const getGeoJSONData = (data: FilteredLocationData) => {
		return {
			type: 'FeatureCollection',
			features: data.map((coordinates, index) => {
				return {
					type: 'Feature',
					properties: {
						index: index
					},
					geometry: {
						type: 'Polygon',
						coordinates: [coordinates]
					}
				};
			})
		};
	};

	return (
		<Source
			type='geojson'
			data={getGeoJSONData(locationData)}
		>
			{locationData.length > 0 && (
				<Layer
					id='data'
					type='fill'
					paint={{
						'fill-color': theme.palette.error.main,
						'fill-opacity': 0.24
					}}
				/>
			)}
		</Source>
	);
};

export default BandobasArea;
