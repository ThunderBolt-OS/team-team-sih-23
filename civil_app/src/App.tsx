import "./App.css";
import { PropsWithChildren } from "react";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import router from "./config/routes";
import AuthProvider from "./context/AuthProvider";
import StopsProvider from "./context/StopsProvider";
import BusRoutesProvider from "./context/BusRoutesProvider";
import BusesProvider from "./context/BusesProvider";

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

function Providers(props: PropsWithChildren) {
  // const providers = [AuthProvider, StopsProvider, BusRoutesProvider];
  // let all = <>{props.children}</>;
  // for (let i = providers.length; i >= 0; i--) {
  //   const P = providers[i];
  //   all = <P>{all}</P>;
  // }

  return (
    <SnackbarProvider maxSnack={5} preventDuplicate>
      <AuthProvider>
        <StopsProvider>
          <BusesProvider>
            <BusRoutesProvider>{props.children}</BusRoutesProvider>
          </BusesProvider>
        </StopsProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
