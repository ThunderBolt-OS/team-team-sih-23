import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState<string | null>(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(otp);
      navigate("/dashboard");
      enqueueSnackbar("Successfully Logged In", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Unable to login please check otp", {
        variant: "error",
      });
    }
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
        <TextField
          id="outlined-basic"
          label="Enter Otp"
          variant="outlined"
          onChange={(e) => setOtp(e.target.value)}
          type="number"
          fullWidth
        />
        <Button variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Box>
    </>
  );
}

export default VerifyOtp;
