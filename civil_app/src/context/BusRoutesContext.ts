import React from "react";

import type { PositionDataInterface } from "../types/PositionDataInterface";

export type BusRoutesContextValueType = {
  data: Record<
    number, // Bus number
    {
      busNumber: number;
      totalTime: number;
      stops: Array<
        PositionDataInterface & {
          id: number;
          name: string;
          estimatedTime: string;
        }
      >;
    }
  >;
  getGeoJsonForRouteOf: (busNumber: number) => any;
};

const BusRoutesContext = React.createContext<BusRoutesContextValueType>(
  {} as BusRoutesContextValueType,
);

export default BusRoutesContext;
