import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuth } from "@/hook/auth";
import { DataProps } from "@/interface/auth";

type AuthDataProps = {
  data: DataProps;
};

export function Routes() {
  const { data } = useAuth() as AuthDataProps;

  return (
    <BrowserRouter>
      {data?.token ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}
