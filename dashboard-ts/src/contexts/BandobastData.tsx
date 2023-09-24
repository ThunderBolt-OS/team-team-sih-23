import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { GET } from '../api/fetch';
import { BandobasResponseType } from '../components/Dashboard/Map/BandobasArea/BandobasArea';
import { BandobastOfficersResponseType } from '../components/Dashboard/Map/OfficersWithAssignedLocations/OfficerWithAssignedLocation';
import isCurrentTimeInRange from '../utils/isCurrentTimeInRange';

type BandoBastData = {
	officers: BandobastOfficersResponseType;
	setOfficers: React.Dispatch<React.SetStateAction<BandobastOfficersResponseType>>;
	filterObject: {
		department: string[];
		weapon: string[];
		rank: string[];
	};
	setfilterObject: React.Dispatch<
		React.SetStateAction<{
			department: string[];
			weapon: string[];
			rank: string[];
		}>
	>;
	FilteredOfficers: BandobastOfficersResponseType;
	setFilteredOfficers: React.Dispatch<React.SetStateAction<BandobastOfficersResponseType>>;
	handleFilterChange: (changed: 'department' | 'weapon' | 'rank', value: string) => void;
};

const BandoBastContext = createContext<BandoBastData | null>(null);

export const BandoBastProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [officers, setOfficers] = useState<BandobastOfficersResponseType>([]);

	const [filterObject, setfilterObject] = useState<{
		department: string[];
		weapon: string[];
		rank: string[];
	}>({
		department: [],
		weapon: [],
		rank: []
	});

	const [FilteredOfficers, setFilteredOfficers] = useState<BandobastOfficersResponseType>([]);

	function removeselection(selectionList: string[], selectionToRemove: string): string[] {
		const index = selectionList.indexOf(selectionToRemove);
		if (index !== -1) {
			selectionList.splice(index, 1);
		}
		return selectionList;
	}
	function checkIfElementIsContained(inputString: string, weaponList: string[]): boolean {
		for (const weapon of weaponList) {
			if (inputString.includes(weapon)) {
				return true;
			}
		}
		return false;
	}
	const handleFilterChange = (changed: 'department' | 'weapon' | 'rank', value: string) => {
		if (filterObject[changed].includes(value)) {
			const arr = removeselection(filterObject[changed], value);
			setfilterObject({ ...filterObject, [changed]: arr });
			setFilteredOfficers(
				officers.filter(
					item =>
						(filterObject.department.length > 0
							? filterObject.department.includes(item.police_user.department)
							: true) &&
						(filterObject.rank.length > 0 ? filterObject.rank.includes(item.police_user.rank) : true) &&
						(filterObject.weapon.length > 0
							? checkIfElementIsContained(item.weapons, filterObject.weapon)
							: true)
				)
			);
		} else {
			const fObj = filterObject;
			fObj[changed].push(value);
			setfilterObject(fObj);
			setFilteredOfficers(
				officers.filter(
					item =>
						(filterObject.department.length > 0
							? filterObject.department.includes(item.police_user.department)
							: true) &&
						(filterObject.rank.length > 0 ? filterObject.rank.includes(item.police_user.rank) : true) &&
						(filterObject.weapon.length > 0
							? checkIfElementIsContained(item.weapons, filterObject.weapon)
							: true)
				)
			);
		}
	};
	useEffect(() => {
		(async () => {
			const apiResponse: BandobasResponseType = await GET('bandobast/');

			if (apiResponse?.data?.length > 0) {
				// TODO change data indexing location
				const bandobastId = apiResponse.data[0].id;
				// console.log('bandobastId', bandobastId);
				// console.log('apiResponse', apiResponse);

				let officerApiResponse: BandobastOfficersResponseType = await GET(
					'bandobas-officers/bandobas/' + bandobastId + '/'
				);

				if (officerApiResponse?.length > 0) {
					officerApiResponse = officerApiResponse.map(officer => ({
						...officer,
						is_currently_assigned: isCurrentTimeInRange(
							new Date(officer.duty_start_time),
							new Date(officer.duty_end_time)
						)
					}));

					setOfficers(officerApiResponse);
					setFilteredOfficers(officerApiResponse);
				}
			}
		})();
	}, []);

	return (
		<BandoBastContext.Provider
			value={{
				setOfficers,
				officers,
				filterObject,
				setfilterObject,
				FilteredOfficers,
				setFilteredOfficers,
				handleFilterChange
			}} // Use the new variable name here
		>
			{children}
		</BandoBastContext.Provider>
	);
};

export default BandoBastContext;
