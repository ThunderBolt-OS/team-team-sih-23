import React from "react";
import { Box, Grid, Button, Typography, Card } from "@mui/material";
import { Link } from "react-router-dom";

function BusOfferCard({ title, subTitle, icon, buttonLink }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #eee",
        padding: 2,
        width: "100%",
        mx: 1,
      }}
    >
      <Box display="flex" flexDirection="column" flex={0.8}>
        <Typography fontSize="20px" fontWeight="500">
          {title}
        </Typography>
        <Typography
          sx={{
            mb: 2,
            fontSize: "15px",
          }}
        >
          {subTitle}
        </Typography>
        <Link to={buttonLink}>
          <Button variant="outlined">Learn more</Button>
        </Link>
      </Box>
      <Box alignSelf="end">{icon} </Box>
    </Card>
  );
}

export default BusOfferCard;
