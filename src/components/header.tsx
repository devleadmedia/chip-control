import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode_toggle";

import Logo from "@/assets/logo.png";
import { signOut } from "@/api/auth/sign-out";

export function Header() {
  const navigate = useNavigate();

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  function handlePage(navigation: string) {
    navigate(navigation);
  }

  return (
    <header className="shadow-md">
      <div className="flex justify-between items-end w-full mx-auto py-5 px-3">
        <div className="flex items-end justify-start flex-row gap-5">
          <button type="button" onClick={() => navigate("/")}>
            <img className="w-52" src={Logo} alt="Check Operadora" />
          </button>
        </div>

        <ul className="flex items-center flex-row gap-4">
          <li>
            <button
              onClick={() => handlePage("/users")}
              type="button"
              className={`hover:duration-100 text-sm font-bold cursor-pointer ${
                location.pathname === "/" ||
                (location.pathname === "/users" &&
                  "text-sm font-bold text-sky-400 transition cursor-pointer")
              }`}
            >
              Usuários
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePage("/chips")}
              type="button"
              className={
                location.pathname === "/chips"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Chips
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePage("/holders")}
              type="button"
              className={
                location.pathname === "/holders"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Títulares
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePage("/devices")}
              type="button"
              className={
                location.pathname === "/devices"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Dispositivos
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePage("/recharges")}
              type="button"
              className={
                location.pathname === "/recharges"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Recargas
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePage("/controls")}
              type="button"
              className={
                location.pathname === "/controls"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Controles
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePage("/sms-receiver")}
              type="button"
              className={
                location.pathname === "/sms-receiver"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              SMS Receiver
            </button>
          </li>
        </ul>

        <div className="flex items-end flex-col gap-2">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tema</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon" onClick={handleSignOut}>
                    <LogOut size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sair</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <p className="text-xs font-normal text-sky-400">
            Bem vindo, Fulano de tal
          </p>
        </div>
      </div>
    </header>
  );
}
