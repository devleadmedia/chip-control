import { AlertMessage } from "@/components/alert_message";
import { api } from "@/services/api";

export interface SignInBody {
  email: string;
  senha: string;
}

export async function signIn({ email, senha }: SignInBody) {
  const response = await api.post("/login", {
    email,
    senha,
  });

  const { user } = response.data;

  localStorage.setItem("@chip_control:user", JSON.stringify(user));
  localStorage.setItem("@chip_control:token", user.token);

  AlertMessage(user.message || "Login efetuado com sucesso!", "success");

  setTimeout(() => {
    window.location.reload();
  }, 3000);

  return user;
}
