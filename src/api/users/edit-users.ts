import { AlertMessage } from "@/components/alert_message";
import { api } from "@/services/api";

interface EditUsersResponse {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  tel: string;
  datanascimento: string;
  uf: string;
  cidade: string;
  genero: string;
  cargo: string;
}

export async function editUsers({
  nome,
  sobrenome,
  email,
  senha,
  tel,
  datanascimento,
  uf,
  cidade,
  genero,
  cargo,
}: EditUsersResponse) {
  const response = await api.post("/createuser", {
    nome,
    sobrenome,
    email,
    senha,
    tel,
    datanascimento,
    uf,
    cidade,
    genero,
    cargo,
  });

  AlertMessage(
    response.data.message ?? "Usuário editado com sucesso!",
    "success"
  );
}
