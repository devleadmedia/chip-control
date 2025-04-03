import { api } from "@/services/api";

export interface GetRechargesResponse {
  id: number;
  numero: string;
  data: string;
  valor: string;
  expiracao: string;
  chip: string;
}

export async function getRecharges() {
  const userToken = localStorage.getItem("@chip_control:token");

  const response = await api.get<GetRechargesResponse[]>("/listarrecarga", {
    headers: {
      "x-access-token": userToken,
    },
  });

  return response.data;
}
