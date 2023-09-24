import React from "react";

export type BusesContextValueDataType = {
  data: Record<
    number,
    {
      busNumber: number;
      type: string;
      crowdLevel: 1 | 2 | 3;
    }
  >;
};

const BuseseContext = React.createContext<BusesContextValueDataType>(
  {} as BusesContextValueDataType,
);

export default BuseseContext;
