import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export const menuList = [
  {
    text: "Find Bus",
    icon: <DirectionsBusIcon />,
    route: "/dashboard",
  },
  {
    text: "Request",
    icon: <AnalyticsIcon />,
    route: "/dashboard/request",
  },
];
