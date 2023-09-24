import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NotFound from "../pages/NotFound/NotFound.tsx";
import LoadingScreen from "./LoadingScreen";

import AuthContext from "../context/AuthContext";

// import axios from "../config/axios";
// import { menuList } from "../utils/menuList";

const ProtectedRoute = ({ children }) => {
  const { user, token } = React.useContext(AuthContext);
  //   const navigate = useNavigate();
  //   const location = useLocation();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user === null || token === null) {
      setLoading(null);
      //   navigate("/login");
    }
    // TODO: Remove this after integration with backend
    setLoading(false);
  }, [token, user]);

  if (loading === null) return <NotFound />;
  else if (loading) return <LoadingScreen />;
  return <>{children}</>;
};

export default ProtectedRoute;
