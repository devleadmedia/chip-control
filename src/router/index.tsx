import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const getTokenUser = localStorage.getItem("@chip_control:token");

  return (
    <BrowserRouter>
      {getTokenUser ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}
