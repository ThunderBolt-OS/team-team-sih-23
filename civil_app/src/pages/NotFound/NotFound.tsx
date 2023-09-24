import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      position="absolute"
      top="0"
      left="0"
    >
      <Typography variant="h4" margin="auto">
        404 Not found
      </Typography>
    </Box>
  );
}
