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

import { useContextState } from "@/hook/state";
import { EditUser } from "@/modals/edit_user";
import { useAuth } from "@/hook/auth";

import { IsFocusProps } from "@/interface/state.d";
import Logo from "@/assets/logo.png";

type HandleLogOutProps = {
  handleLogout: () => void;
};

export function Header() {
  const { handleLogout } = useAuth() as HandleLogOutProps;
  const { isFocus, setIsFocus } = useContextState() as IsFocusProps;
  const navigate = useNavigate();

  function handlePage(focus: string, navigation: string) {
    setIsFocus(focus);
    navigate(navigation);
  }

  return (
    <header className="shadow-md">
      <div className="flex justify-between items-end w-full max-w-7xl mx-auto py-5 px-3">
        <div className="flex items-end justify-start flex-row gap-5">
          <img className="w-52" src={Logo} alt="Check Operadora" />
        </div>

        <ul className="flex items-center flex-row gap-4">
          <li onClick={() => handlePage("usuario", "/")}>
            <span
              className={
                isFocus === "usuario"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Usuário
            </span>
          </li>
          <li onClick={() => handlePage("chips", "/")}>
            <span
              className={
                isFocus === "chips"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Chips
            </span>
          </li>
          <li onClick={() => handlePage("holders", "/")}>
            <span
              className={
                isFocus === "holders"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Títulares
            </span>
          </li>
          <li onClick={() => handlePage("device", "/")}>
            <span
              className={
                isFocus === "device"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Aparelhos
            </span>
          </li>
          <li onClick={() => handlePage("recharge", "/")}>
            <span
              className={
                isFocus === "recharge"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Recargas
            </span>
          </li>
          <li onClick={() => handlePage("control", "/")}>
            <span
              className={
                isFocus === "control"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              Controle
            </span>
          </li>
          <li onClick={() => handlePage("sms_receiver", "/")}>
            <span
              className={
                isFocus === "sms_receiver"
                  ? "text-sm font-bold text-sky-400  transition cursor-pointer"
                  : "text-sm font-bold  transition cursor-pointer"
              }
            >
              SMS Receiver
            </span>
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
                  <EditUser />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar usuário</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon" onClick={handleLogout}>
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
