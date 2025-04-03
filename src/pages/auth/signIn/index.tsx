import { LoginForm } from "./components/login-form";

import logo from "@/assets/logo.png";
import imagem_login from "@/assets/imagem-login.png";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={imagem_login}
          alt="Imagem de um chip"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <button type="button" onClick={() => navigate("/")}>
            <img className="w-52" src={logo} alt="Logo Chip control" />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
