import { api } from "@/services/api";

interface GetDataHoldersReponse {
  id: number;
  cnpj: string | null;
  cpf: string | null;
  data_nascimento: string;
  endereco: string;
  nome_razao: string;
  obs: string;
  pf: string | null;
  pj: string | null;
  status: string;
  type_user: string;
  chip: string;
  servico: string;
}

export async function getHolders() {
  const userToken = localStorage.getItem("@chip_control:token");

  const response = await api.get<GetDataHoldersReponse[]>("/listartitular", {
    headers: {
      "x-access-token": userToken,
    },
  });

  return response.data;
}
