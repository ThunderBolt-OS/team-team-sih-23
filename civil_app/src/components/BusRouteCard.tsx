import React from "react";
import {
  Box,
  Typography,
  Card,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  StepLabel,
  Stepper,
  Step,
} from "@mui/material";
import { BusObject } from "./types";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

function BusRouteCard({
  busName,
  startStop,
  endStop,
  allStops,
  status,
}: BusObject) {
  const navigate = useNavigate();
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 2,
            my: 1,
            width: "100%",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid #eeeeee"
            onClick={() => navigate("/dashboard/busDetails/" + busName)}
          >
            <Box display="flex" alignItems="center">
              <DirectionsBusIcon sx={{ fontSize: "24px", mr: 1 }} />
              <Typography fontSize="24px" fontWeight="bold">
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
          >
            <Box>
              <Typography fontSize="18px" fontWeight="bold">
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
              <Typography fontSize="18px" fontWeight="bold">
                {endStop.name}
              </Typography>
              <Typography>{endStop.estimatedTime}</Typography>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stepper activeStep={-1} orientation="vertical">
          {allStops.map((step) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  <Typography variant="caption">
                    {step.estimatedTime}
                  </Typography>
                }
              >
                {step.name}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </AccordionDetails>
    </Accordion>
  );
}

export default BusRouteCard;
