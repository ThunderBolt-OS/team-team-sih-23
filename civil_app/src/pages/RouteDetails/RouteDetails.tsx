import React, { useContext, useState } from "react";
import { Box, Typography, Card } from "@mui/material";

import RoomIcon from "@mui/icons-material/Room";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusRouteCard from "../../components/BusRouteCard";
import { BusObject } from "../../components/types";
import Navbar from "../../components/Navbar";
import BusRoutesContext from "../../context/BusRoutesContext";
import { useLocation } from "react-router-dom";

function RouteDetails() {
  const { data } = useContext(BusRoutesContext);
  const { state } = useLocation();

  const [routes, setRoutes] = React.useState<Array<BusObject> | null>([]);
  const [topData, setTopData] = useState([
    {
      icon: <RoomIcon sx={{ fontSize: "30px" }} />,
      name: "Distance",
      value: "18kms",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: "30px" }} />,
      name: "Time",
      value: "30mins",
    },
    //   {
    // icon: <AccessTimeIcon sx={{ fontSize: "30px" }} />,
    // name: "Carbon Emission",
    // value: "30%",
    //   },
  ]);
  React.useEffect(() => {
    const temp = Object.keys(data).map((key) => ({
      busName: data[key].busNumber,
      startStop: data[key].stops[0],
      endStop: data[key].stops[data[key].stops.length - 1],
      allStops: data[key].stops,
    }));

    setRoutes(temp as [BusObject]);
  }, [data]);

  return (
    <>
      <Navbar isGoBack />
      <Box m={2}>
        <Typography fontSize="16px">Final Destination:</Typography>
        <Typography fontSize="24px">{state?.to}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-evenly">
        {topData.map(({ icon, name, value }) => (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            key={name + value}
          >
            <Typography>{name}</Typography>
            <Box
              sx={{
                border: "1px solid black",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 1,
                mb: 1,
              }}
            >
              {icon}
            </Box>
            <Typography>{value}</Typography>
          </Box>
        ))}
      </Box>
      <Box m={2}>
        {routes?.map(
          ({ busName, startStop, endStop, allStops, status }: BusObject) => {
            return (
              <BusRouteCard
                key={busName}
                busName={busName}
                startStop={startStop}
                endStop={endStop}
                allStops={allStops}
                status={status}
              />
            );
          },
        )}
      </Box>
    </>
  );
}

export default RouteDetails;
