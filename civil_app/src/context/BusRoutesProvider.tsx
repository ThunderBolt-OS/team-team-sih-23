import { PropsWithChildren, useEffect, useState } from "react";

import BusRoutesContext, {
  type BusRoutesContextValueType,
} from "./BusRoutesContext.ts";
import { createGeoJSON } from "../utils/navigation.tsx";
import { addMinutes } from "../utils/dateFunctions.ts";

function BusRoutesProvider(props: PropsWithChildren) {
  const [data, setData] = useState<BusRoutesContextValueType["data"]>({});

  useEffect(() => {
    // Using mock data
    const mockBusRoutes: BusRoutesContextValueType["data"] = {
      100: {
        busNumber: 100,
        totalTime: 20,
        stops: [
          {
            id: 1,
            name: "Jijamata Bhonsle Marg Junction",
            lat: 19.072625706982365,
            lon: 72.90807010184905,
            estimatedTime: addMinutes(new Date(), 10),
          },
          {
            id: 2,
            name: "Kamraj Nagar",
            lat: 19.073434006455,
            lon: 72.90922454232884,
            estimatedTime: addMinutes(new Date(), 15),
          },
          {
            id: 3,
            name: "Garodia Nagar",
            lat: 19.074787385400324,
            lon: 72.90657471534232,
            estimatedTime: addMinutes(new Date(), 20),
          },
        ],
      },
      200: {
        busNumber: 200,
        totalTime: 58,
        stops: [
          {
            id: 4,
            name: "Somaiya Mahavidyalaya",
            lat: 19.074675983196723,
            lon: 72.90391418650674,
            estimatedTime: addMinutes(new Date(), 8),
          },
          {
            id: 5,
            name: "Indian Oil Nagar",
            lat: 19.063955463788318,
            lon: 72.91310485474095,
            estimatedTime: addMinutes(new Date(), 20),
          },
          {
            id: 6,
            name: "Shivaji Nagar Junction",
            lat: 19.06327722475039,
            lon: 72.91743470971575,
            estimatedTime: addMinutes(new Date(), 29),
          },
          {
            id: 7,
            name: "Shivaji Nagar Junction",
            lat: 19.06327722475039,
            lon: 72.91743470971575,
            estimatedTime: addMinutes(new Date(), 38),
          },
          {
            id: 8,
            name: "Maharashtra Nagar",
            lat: 19.051715871273274,
            lon: 72.9373939704221,
            estimatedTime: addMinutes(new Date(), 58),
          },
        ],
      },
      300: {
        busNumber: 300,
        totalTime: 46,
        stops: [
          {
            id: 1,
            name: "Jijamata Bhonsle Marg Junction",
            lat: 19.072625706982365,
            lon: 72.90807010184905,
            estimatedTime: addMinutes(new Date(), 10),
          },
          {
            id: 2,
            name: "Kamraj Nagar",
            lat: 19.073434006455,
            lon: 72.90922454232884,
            estimatedTime: addMinutes(new Date(), 15),
          },
          {
            id: 8,
            name: "Maharashtra Nagar",
            lat: 19.051715871273274,
            lon: 72.9373939704221,
            estimatedTime: addMinutes(new Date(), 46),
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
