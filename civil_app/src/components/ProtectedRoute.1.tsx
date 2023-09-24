import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound.tsx";
import LoadingScreen from "./LoadingScreen";
import AuthContext from "../context/AuthContext";

// import axios from "../config/axios";
// import { menuList } from "../utils/menuList";
export const ProtectedRoute = ({ children }) => {
  const { user, token, getApiHeadersWithToken, userRole } =
    React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user === null || token === null) {
      setLoading(null);
    }
  }, []);

  if (loading === null) return <NotFound />;
  else if (loading) return <LoadingScreen />;
  return <>{children}</>;
};
