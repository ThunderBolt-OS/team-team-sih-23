import { useContext, useEffect, useState } from 'react';
import TagLocation from './TagLocation/TagLocation';
import BandoBastContext from '../../../../contexts/BandobastData';
import CurvedLine from '../CurvedLine/CurvedLine';
import NFCInfoSidebar, { NFCInfoSidebarProps } from '../NFCInfoSidebar/NFCInfoSidebar';
import { SidebarContext } from '../../../../contexts/SidebarContext';
import PoliceInfoSidebarProfile from '../PoliceInfoSidebar/PoliceInfoSidebarProfile';

type Props = {
	bandobastId: number;
};

export type BandobastOfficersResponseType = Array<{
	id: number;
	police_user: {
		id: number;
		name: string;
		phone: string;
		rank: string;
		department: string;
		image_url: string;
	};
	fcm_token: string;
	device_id: string;
	duty_start_time: string;
	duty_end_time: string;
	created_by: number;
	assigned_nfc_device: number;
	weapons: string;

	is_currently_assigned?: boolean;
}>;

const OfficersWithAssignedLocations = ({}: Props) => {
	const bandobasContext = useContext(BandoBastContext);
	const { policeInfoSidebarProps, setPoliceInfoSidebarProps } = useContext(SidebarContext);

	const [sidebarData, setSidebarData] = useState<NFCInfoSidebarProps | null>(null);

	useEffect(() => {
		if (policeInfoSidebarProps?.open === true) {
			setSidebarData(null);
		}
	}, [policeInfoSidebarProps]);

	useEffect(() => {
		if (sidebarData?.open === true) {
			setPoliceInfoSidebarProps(null);
		}
	}, [sidebarData]);

	console.log("officers image in officer with asssigned location", bandobasContext?.FilteredOfficers)

	return (
		<div>
			{bandobasContext &&
				bandobasContext.FilteredOfficers.map(officer => {
					return (
						<div key={officer.id}>
							{/* <CurvedLine /> */}
							{/* {officer.is_currently_assigned === true && ( */}
							<TagLocation
								deviceId={officer.assigned_nfc_device}
								officerId={officer.id}
								officerImg={officer.police_user.image_url}
								department={officer.police_user.department}
								nfcSidebarCallback={data => {
									// console.log(data.nfcId);
									setSidebarData(data);
								}}
							/>
							{/* )} */}
						</div>
					);
				})}

			{sidebarData && <NFCInfoSidebar {...sidebarData} />}

			{policeInfoSidebarProps && <PoliceInfoSidebarProfile {...policeInfoSidebarProps} />}
		</div>
	);
};

export default OfficersWithAssignedLocations;
