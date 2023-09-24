import { PropsWithChildren, useEffect, useState } from "react";

import BusRoutesContext, {
  type BusRoutesContextValueType,
} from "./BusRoutesContext.ts";
import { createGeoJSON } from "../utils/navigation.tsx";
import { addMinutes } from "../utils/dateFunctions.tsx";

function BusRoutesProvider(props: PropsWithChildren) {
  const [data, setData] = useState<BusRoutesContextValueType["data"]>({});

  useEffect(() => {
    // Using mock data
    const mockBusRoutes: BusRoutesContextValueType["data"] = {
      100: {
        busNumber: 100,
        stops: [
          {
            id: 1,
            name: "Stop1",
            lat: 19.0771110952482,
            lon: 72.90933586533657,
            estimatedTime: addMinutes(new Date(), 10),
          },
          {
            id: 2,
            name: "Stop2",
            lat: 19.078524457476057,
            lon: 72.91072873455373,
            estimatedTime: addMinutes(new Date(), 15),
          },
          {
            id: 3,
            name: "Stop3",
            lat: 19.075215670322585,
            lon: 72.912683031382,
            estimatedTime: addMinutes(new Date(), 20),
          },
          {
            id: 4,
            name: "Stop4",
            lat: 19.07457652881865,
            lon: 72.90316256245599,
            estimatedTime: addMinutes(new Date(), 35),
          },
        ],
      },
    };
    setData(mockBusRoutes);
  }, []);

  async function getGeoJsonForRouteOf(busNumber: number) {
    const locationsList = data[busNumber].stops.map((s) => [s.lat, s.lon]);
    return await createGeoJSON(locationsList);
  }

  return (
    <BusRoutesContext.Provider value={{ data, getGeoJsonForRouteOf }}>
      {props.children}
    </BusRoutesContext.Provider>
  );
}

export default BusRoutesProvider;
