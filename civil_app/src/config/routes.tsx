import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import { Outlet } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound.tsx";
import Login from "../pages/Login/Login.tsx";
import Home from "../pages/Home/Home.tsx";
import VerifyOtp from "../pages/Login/VerifyOtp.tsx";
import RouteDetails from "../pages/RouteDetails/RouteDetails.tsx";
import BusDetails from "../pages/BusDetails/BusDetails.tsx";
import RequestForm from "../pages/Request/RequestForm.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verifyOtp",
    element: <VerifyOtp />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "routeDetails",
        element: <RouteDetails />,
      },
      {
        path: "busDetails/:busNumber",
        element: <BusDetails />,
      },
      {
        path: "request",
        element: <RequestForm />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
