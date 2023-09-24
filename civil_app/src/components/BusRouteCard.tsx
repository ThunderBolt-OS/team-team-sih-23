import React from "react";
import { Box, Typography, Card, Chip } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BusObject } from "./types";

function BusRouteCard({
  busName,
  startStop,
  endStop,
  allStops,
  status,
}: BusObject) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        my: 2,
        border: "1px solid #eee",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #eeeeee"
      >
        <Box display="flex" alignItems="center">
          <DirectionsBusIcon sx={{ fontSize: "26px", mr: 1 }} />
          <Typography fontSize="26px" fontWeight="bold">
            {busName}
          </Typography>
        </Box>
        {status && <Chip label={status} />}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        pt={2}
        pb={1}
      >
        <Box>
          <Typography fontSize="22px" fontWeight="bold">
            {startStop.name}
          </Typography>
          <Typography>{startStop.estimatedTime}</Typography>
        </Box>
        <Box>
          <ArrowForwardIcon
            sx={{
              fontSize: "30px",
            }}
          />
        </Box>
        <Box>
          <Typography fontSize="22px" fontWeight="bold">
            {endStop.name}
          </Typography>
          <Typography>{endStop.estimatedTime}</Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default BusRouteCard;
