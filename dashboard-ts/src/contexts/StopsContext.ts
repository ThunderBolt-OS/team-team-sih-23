import React from "react";

import type { PositionDataInterface } from "../types/PositionDataInterface";

export type StopsContextValueType = {
  data: Record<
    number,
    PositionDataInterface & {
      name: string;
    }
  >;
};

const StopsContext = React.createContext<StopsContextValueType>(
  {} as StopsContextValueType,
);

export default StopsContext;
