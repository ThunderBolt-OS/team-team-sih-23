import { PropsWithChildren, useEffect, useState } from "react";

import StopsContext, { type StopsContextValueType } from "./StopsContext.ts";

function StopsProvider(props: PropsWithChildren) {
  const [data, setData] = useState<StopsContextValueType["data"]>({});

  useEffect(() => {
    // Using mock data
    const mockStopsData: StopsContextValueType["data"] = {
      1: { name: "Stop1", lat: 19.0771110952482, lon: 72.90933586533657 },
      2: { name: "Stop2", lat: 19.078524457476057, lon: 72.91072873455373 },
      3: { name: "Stop3", lat: 19.075215670322585, lon: 72.912683031382 },
      4: { name: "Stop4", lat: 19.07457652881865, lon: 72.90316256245599 },
    };
    setData(mockStopsData);
  }, []);

  return (
    <StopsContext.Provider value={{ data }}>
      {props.children}
    </StopsContext.Provider>
  );
}

export default StopsProvider;
