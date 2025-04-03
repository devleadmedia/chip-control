import { AlertMessage } from "@/components/alert_message";
import { api } from "@/services/api";

interface CreateUsersResponse {
  nome: string;
  email: string;
  senha: string;
}

export async function createUsers({ nome, email, senha }: CreateUsersResponse) {
  const response = await api.post("/createuser", { nome, email, senha });

  AlertMessage(
    response.data.message ?? "Usuário criado com sucesso!",
    "success"
  );
}
