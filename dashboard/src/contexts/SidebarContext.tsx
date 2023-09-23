import { createContext, useState, ReactNode } from 'react';

import { PoliceInfoSidebarProps } from '../components/Dashboard/Map/PoliceInfoSidebar/PoliceInfoSidebarProfile';

type PoliceInfoSidebarPropsStateType = PoliceInfoSidebarProps | null;

interface SidebarContextType {
	policeInfoSidebarProps: PoliceInfoSidebarPropsStateType;
	setPoliceInfoSidebarProps: React.Dispatch<React.SetStateAction<PoliceInfoSidebarPropsStateType>>;
}

export const SidebarContext = createContext<SidebarContextType>({
	policeInfoSidebarProps: null,
	setPoliceInfoSidebarProps: () => {}
});

interface SidebarProviderProps {
	children: ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
	const [policeInfoSidebarProps, setPoliceInfoSidebarProps] = useState<PoliceInfoSidebarPropsStateType>(null);

	return (
		<SidebarContext.Provider
			value={{
				policeInfoSidebarProps,
				setPoliceInfoSidebarProps
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};

export default SidebarProvider;
