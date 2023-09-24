import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Button,
} from "@mui/material";
function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = React.useState<string | null>(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(phoneNumber);
    navigate("/verifyOtp");
  };

  return (
    <>
      <Box
        component="form"
        width="100%"
        height="20vh"
        px={2}
        onSubmit={handleSubmit}
        alignItems="center"
        justifyContent="space-evenly"
        display="flex"
        flexDirection="column"
      >
        <FormControl fullWidth variant="outlined">
          <InputLabel
            htmlFor="filled-adornment-amount"
            sx={{ bgcolor: "#ffffff", px: 1 }}
          >
            Phone no
          </InputLabel>
          <OutlinedInput
            id="filled-adornment-amount"
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            startAdornment={
              <InputAdornment position="start">+91</InputAdornment>
            }
          />
        </FormControl>
        <Button variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Box>
    </>
  );
}

export default Login;
