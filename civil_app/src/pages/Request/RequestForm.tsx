import React from "react";
import Navbar from "../../components/Navbar";
import {
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { RequestFormType } from "./types";

function RequestForm() {
  const [formData, setFormData] = React.useState<RequestFormType>({
    firstName: "",
    lastName: "",
    busName: "",
    requestType: "Request New Bus Route",
  });

  const handleChangeForm = (name) => (event) => {
    setFormData((prev) => {
      return { ...prev, [name]: event.target.value };
    });
  };
  const handleOnSubmit = () => {
    console.log(formData);
  };
  return (
    <>
      <Navbar isGoBack />
      <Box mx={2} component="form">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              variant="outlined"
              onChange={handleChangeForm("firstName")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="Last Name"
              variant="outlined"
              onChange={handleChangeForm("lastName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Bus Name"
              variant="outlined"
              onChange={handleChangeForm("busName")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Request Type {"*"}
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.requestType}
                label="Request Type"
                onChange={handleChangeForm("request")}
              >
                <MenuItem value={"Request New Bus Route"}>
                  Request New Bus Route
                </MenuItem>
                <MenuItem value={"Request a new Stop"}>
                  Request a new Stop
                </MenuItem>
                <MenuItem value={"Update Bus Route"}>Update Bus Route</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              minRows={4}
              label="Message"
              variant="outlined"
              onChange={handleChangeForm("message")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={handleOnSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default RequestForm;
