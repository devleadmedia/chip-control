/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, ReactNode, useState } from "react";

import { api } from "@/services/api";
import { AxiosError } from "axios";

import { AlertMessage } from "@/components/alert_message";
import {
  CreateUserProps,
  EditUserProps,
  HandleNewChipProps,
} from "@/interface/auth";

export const AuthContext = createContext({});

interface ChildrenProps {
  children?: ReactNode;
}

function AuthProvider({ children }: ChildrenProps) {
  const [data, setData] = useState(null);

  async function handleSignIn({ email, senha }: CreateUserProps) {
    try {
      const response = await api.post("/login", {
        email,
        senha,
      });
      const { user } = response.data;

      localStorage.setItem("@chip_control:user", JSON.stringify(user));
      window.location.reload();
      AlertMessage(response.data.message, "success");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        AlertMessage(error.response.data.message, "error");
      } else {
        AlertMessage(
          "Não foi possível entrar, tente novamente mais tarde.",
          "error"
        );
      }
    }
  }

  async function handleCreateUsers({ nome, email, senha }: CreateUserProps) {
    try {
      const response = await api.post("/createuser", {
        nome,
        email,
        senha,
      });

      AlertMessage(response.data.message, "success");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        AlertMessage(error.response.data.message, "error");
      } else {
        AlertMessage(
          "Não foi possível criar um usuário agora, tente novamente mais tarde.",
          "error"
        );
      }
    }
  }

  async function handleEditUsers({
    name,
    surname,
    email,
    password,
    phone,
    date_nasc,
    uf,
    city,
    gender,
    office,
  }: EditUserProps) {
    try {
      const response = await api.post("/createuser", {
        nome: name,
        sobrenome: surname,
        email,
        senha: password,
        tel: phone,
        datanascimento: date_nasc,
        uf,
        cidade: city,
        genero: gender,
        cargo: office,
      });

      AlertMessage(response.data.message, "success");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        AlertMessage(error.response.data.message, "error");
      } else {
        AlertMessage(
          "Não foi possível atualizar o usuário agora, tente novamente mais tarde.",
          "error"
        );
      }
    }
  }

  async function handleNewChip({
    place_of_purchase,
    phone,
    value,
    sms,
    zap,
    telegram,
    google,
    yahoo,
    outlook,
    obs,
    status,
    id,
  }: HandleNewChipProps) {
    try {
      const dataChip = {
        local_de_compra: place_of_purchase,
        numero: phone,
        valor: value,
        aparelho_id: id,
        google,
        outlook,
        sms,
        status,
        telegram,
        yahoo,
        whatsapp: zap,
        obs,
      };

      const response = await api.post("/criarchip", { dataChip });

      AlertMessage(response.data.message, "success");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        AlertMessage(error.response.data.message, "error");
      } else {
        AlertMessage(
          "Não foi possível criar um chip agora, tente novamente mais tarde.",
          "error"
        );
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem("@chip_control:user");
    setData(null);
    window.location.reload();
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          handleSignIn,
          handleCreateUsers,
          handleEditUsers,
          handleNewChip,
          handleLogout,
          data,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
