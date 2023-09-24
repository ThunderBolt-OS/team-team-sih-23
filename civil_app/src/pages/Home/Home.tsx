import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import {
  InputBase,
  TextField,
  Box,
  Grid,
  IconButton,
  Button,
  Typography,
  Autocomplete,
  Card,
} from "@mui/material";

import PlaceIcon from "@mui/icons-material/Place";

// Our components
import LiveAreaMap from "../../components/map/LiveAreaMap";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import { HomeFormDataProps } from "./type";
import { useNavigate } from "react-router-dom";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import BusOfferCard from "../../components/BusOfferCard";
import BusRoutesContext from "../../context/BusRoutesContext";
import StopsContext from "../../context/StopsContext";
const options: Array<string> = ["Stop 1", "Stop 2", "Stop 3"];

const featuresData = [
  {
    title: "Live Track Bus",
    subTitle: "Never get Late again",
    link: "",
    icon: (
      <DepartureBoardIcon
        sx={{
          fontSize: "50px",
        }}
      />
    ),
  },
];

function Home() {
  const { data } = useContext(StopsContext);
  const options = Object.keys(data).map((key) => data[key].name);

  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<HomeFormDataProps>({
    from: "",
    to: "",
  });

  const handleChangeForm = (name) => (event, value) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleOnSubmit = () => {
    console.log(formData);
    navigate("routeDetails", {
      state: formData,
    });
  };
  const handleOnSwap = () => {
    const temp1 = formData.from;
    const temp2 = formData.to;
    setFormData({
      from: temp2,
      to: temp1,
    });
  };

  return (
    <>
      <Navbar isMenu isGoBack={false} />

      <Box m={2}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ position: "relative" }}
        >
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={options.map((option) => option)}
              value={formData.from}
              onChange={handleChangeForm("from")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <PlaceIcon fontSize="small" />
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Box
            position="absolute"
            top="25%"
            right="10px"
            bgcolor="#fff"
            borderRadius="50%"
            border="1px solid #eee"
          >
            <IconButton onClick={handleOnSwap}>
              <SwapVerticalCircleIcon
                sx={{
                  fontSize: "38px",
                }}
              />
            </IconButton>
          </Box>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={options.map((option) => option)}
              value={formData.to}
              onChange={handleChangeForm("to")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <PlaceIcon fontSize="small" />
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" fullWidth onClick={handleOnSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box m={2}>
        <Typography fontSize="20px">Offers</Typography>
        <Box>
          {featuresData.map(({ title, subTitle, icon, link }) => (
            <BusOfferCard
              title={title}
              subTitle={subTitle}
              icon={icon}
              buttonLink={link}
            />
          ))}
        </Box>
      </Box>
      <Box mx={2} borderRadius={1}>
        <LiveAreaMap />
      </Box>
    </>
  );
}

export default Home;
