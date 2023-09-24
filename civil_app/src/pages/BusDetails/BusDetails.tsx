import React, { useContext } from "react";
import { Box, Typography, Card, Grid, Button } from "@mui/material";
import HailIcon from "@mui/icons-material/Hail";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import BusRouteMap from "../../components/map/BusRouteMap";
import BuseseContext from "../../context/BusesContext";
import NotFound from "../NotFound/NotFound";

function BusDetails() {
  const { data: busData } = useContext(BuseseContext);
  const { busNumber } = useParams();
  if (busNumber === undefined) return <></>;

  const [data, setData] = React.useState<object>({
    "Arriving By": new Date().toLocaleTimeString(),
    "Bus Type": "CNG",
    "Reaching In": new Date().toLocaleTimeString(),
  });

  const [crowdLevel, setCrowdLevel] = React.useState<number>(0);

  React.useEffect(() => {
    if (busData[busNumber]) {
      setData({
        "Arriving By": new Date().toLocaleTimeString(),
        "Bus Type": busData[busNumber].type,
        "Reaching In": new Date().toLocaleTimeString(),
      });
      setCrowdLevel(busData[busNumber].crowdLevel);
    }
  }, [busData, busNumber]);

  if (!busData[busNumber]) return <NotFound />;

  return (
    <>
      <Navbar isGoBack />
      <Box m={2}>
        <Typography fontSize="16px">Final Stop:</Typography>
        <Typography fontSize="24px">Z Stop, Earth</Typography>
        <Grid container spacing={2} my={1}>
          {Object.keys(data).map((key) => (
            <Grid item xs={6} sm={3}>
              <Typography fontSize="16px">{key}</Typography>
              <Typography fontSize="22px">{data[key]}</Typography>
            </Grid>
          ))}
          <Grid item sm={3}>
            <Typography fontSize="16px">Crowd</Typography>
            <Typography fontSize="22px">
              <HailIcon
                sx={{
                  fontSize: "30px",
                }}
                color={crowdLevel >= 1 ? "success" : "inherit"}
              />

              <HailIcon
                sx={{
                  fontSize: "30px",
                }}
                color={crowdLevel >= 2 ? "success" : "inherit"}
              />
              <HailIcon
                sx={{
                  fontSize: "30px",
                }}
                color={crowdLevel >= 3 ? "success" : "inherit"}
              />
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <BusRouteMap busNumber={parseInt(busNumber)} />
      <Box position="absolute" bottom="0" width="100vw" p={2}>
        <Button variant="contained" fullWidth color="error">
          SOS
        </Button>
      </Box>
    </>
  );
}

export default BusDetails;
