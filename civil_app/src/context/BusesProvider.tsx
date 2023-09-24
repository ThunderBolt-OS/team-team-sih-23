import { PropsWithChildren, useEffect, useState } from "react";

import BusesContext, {
  type BusesContextValueDataType,
} from "./BusesContext.ts";

function BusesProvider(props: PropsWithChildren) {
  const [data, setData] = useState<BusesContextValueDataType["data"]>({});

  useEffect(() => {
    // Using mock data
    const mockStopsData: BusesContextValueDataType["data"] = {
      100: { busNumber: 100, type: "CNG", crowdLevel: 1 },
      200: { busNumber: 200, type: "DISEL", crowdLevel: 2 },
      300: { busNumber: 300, type: "PETROL", crowdLevel: 2 },
    };
    setData(mockStopsData);
  }, []);

  return (
    <BusesContext.Provider value={{ data }}>
      {props.children}
    </BusesContext.Provider>
  );
}

export default BusesProvider;
