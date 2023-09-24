import { PropsWithChildren, useEffect, useState } from "react";

import StopsContext, { type StopsContextValueType } from "./StopsContext.ts";

function StopsProvider(props: PropsWithChildren) {
  const [data, setData] = useState<StopsContextValueType["data"]>({});

  useEffect(() => {
    // Using mock data
    const mockStopsData: StopsContextValueType["data"] = {
      1: {
        id: 1,
        name: "Jijamata Bhonsle Marg Junction",
        lat: 19.072625706982365,
        lon: 72.90807010184905,
      },
      2: {
        id: 2,
        name: "Kamraj Nagar",
        lat: 19.073434006455,
        lon: 72.90922454232884,
      },
      3: {
        id: 3,
        name: "Garodia Nagar",
        lat: 19.074787385400324,
        lon: 72.90657471534232,
      },
      4: {
        id: 4,
        name: "Somaiya Mahavidyalaya",
        lat: 19.074675983196723,
        lon: 72.90391418650674,
      },
      5: {
        id: 5,
        name: "Indian Oil Nagar",
        lat: 19.063955463788318,
        lon: 72.91310485474095,
      },
      6: {
        id: 6,
        name: "Shivaji Nagar Junction",
        lat: 19.06327722475039,
        lon: 72.91743470971575,
      },
      7: {
        id: 7,
        name: "Shivaji Nagar Junction",
        lat: 19.06327722475039,
        lon: 72.91743470971575,
      },
      8: {
        id: 8,
        name: "Maharashtra Nagar",
        lat: 19.051715871273274,
        lon: 72.9373939704221,
      },
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
