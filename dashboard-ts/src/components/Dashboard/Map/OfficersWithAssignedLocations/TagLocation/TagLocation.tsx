import { useContext, useEffect, useState } from 'react';
import { GET } from '../../../../../api/fetch';
import { Layer, Marker, Source } from 'react-map-gl';
import OfficerLocation from '../OfficerLocation/OfficerLocation';
import { ErrorBoundary } from 'react-error-boundary';
import { useTheme } from '@mui/material/styles';
import NFCInfoSidebar, { NFCInfoSidebarProps } from '../../NFCInfoSidebar/NFCInfoSidebar';
import CurvedLine from '../../CurvedLine/CurvedLine';
import { ShowDeviceOrOfficerContext } from '../../../../../contexts/ShowDeviceOrOfficer';

type Props = {
	deviceId: number;
	officerId: number;
	department: string;

	nfcSidebarCallback: (data: NFCInfoSidebarProps) => void;

	officerImg: string;
};

export type DeviceResponseType = {
	id: number;
	is_assigned: boolean;
	name: string;
	nfc_data: string;
	timestamp: string;
	expires_at: string;
	device_type: string;
	latitude: number;
	longitude: number;
	altitude: number;
	radius_in_meters: number;
	circle_geojson: {
		type: string;
		coordinates: Array<Array<Array<number>>>;
	};
	created_by: number;
	assigned_to_bandobas: number;
};

const TagLocation = ({ deviceId, officerId, department, nfcSidebarCallback, officerImg }: Props) => {
	const [device, setDevice] = useState<DeviceResponseType | null>(null);
	const theme = useTheme();
	const [openNFCInfo, setOpenNFCInfo] = useState(false);

	const [reload, setReload] = useState(0);

	const [assignedPosition, setAssignedPosition] = useState(true);

	const [officerLocation, setOfficerLocation] = useState<{ latitude: number; longitude: number } | null>(null);

	const [isPoliceHoveredOn, setIsPoliceHoveredOn] = useState(false);
	const [isOfficerHoveredOn, setIsOfficerHoveredOn] = useState(false);
	const { showDeviceOrOfficerData } = useContext(ShowDeviceOrOfficerContext);
	const { showDeviceOrOfficer } = showDeviceOrOfficerData;

	useEffect(() => {
		(async () => {
			const apiResponse: DeviceResponseType = await GET('nfc-devices/' + deviceId + '/');

			if (apiResponse?.id) {
				setDevice(apiResponse);
			}
		})();
	}, []);

	useEffect(() => {
		// nfcSidebarCallback handle
		if (device) {
			nfcSidebarCallback({
				open: openNFCInfo,
				setOpen: setOpenNFCInfo,
				assignedPosition: assignedPosition,
				setAssignedPosition: setAssignedPosition,
				nfcId: device.id
			});
		}
	}, [openNFCInfo, assignedPosition, device, reload]);

	return (
		<>
			<ErrorBoundary fallback={<></>}>
				{device && (
					<>
						{/* marker for NFC device */}
						{/* TODO different marker for 'geo' DONE*/}
						{showDeviceOrOfficer === 'devices' && (
							<>
								<Marker
									key={device.id}
									latitude={device.latitude}
									longitude={device.longitude}
									style={markerStyle}
									onClick={() => {
										setAssignedPosition(false);
										setOpenNFCInfo(true);
										setReload(prev => prev + 1);
									}}
								>
									<img
										src={`/home/map/${device.is_assigned ? 'assigned' : 'unassigned'}/${
											device.device_type ? device.device_type : 'geo'
										}.png`}
										width={30}
										alt='Police Marker'
										onMouseEnter={() => {
											setIsPoliceHoveredOn(true);
										}}
										onMouseLeave={() => {
											setIsPoliceHoveredOn(false);
										}}
									/>
								</Marker>
								{/* circlular geofence around the device */}
								<Source
									type='geojson'
									data={{
										type: 'Feature',
										geometry: device.circle_geojson
									}}
								>
									<Layer
										type='fill'
										paint={{
											'fill-color': theme.palette.primary.main,
											'fill-opacity': 0.2
										}}
									/>
								</Source>
							</>
						)}

						{/* {showDeviceOrOfficer === 'policeOfficers' && ( */}
						<OfficerLocation
							officerId={officerId}
							officerImg={officerImg}
							department={department}
							latLonCallback={(lat, lon) => {
								setOfficerLocation({ latitude: lat, longitude: lon });
							}}
							isOfficerHoveredOnCallback={isHovered => {
								setIsOfficerHoveredOn(isHovered);
							}}

						/>
						{/* )} */}

						{officerLocation && (isPoliceHoveredOn || isOfficerHoveredOn) && (
							<CurvedLine
								id={device.id.toString()}
								sourceLat={device.latitude}
								sourceLon={device.longitude}
								destLat={officerLocation.latitude}
								destLon={officerLocation.longitude}
							/>
						)}
					</>
				)}
			</ErrorBoundary>
		</>
	);
};

const markerStyle = {
	cursor: 'pointer'
};

export default TagLocation;
