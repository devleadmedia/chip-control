import { api } from "@/services/api";

export interface GetChipsReponse {
  id: number;
  local_de_compra: string;
  valor: string;
  numero: string;
  sms: string;
  whatsapp: string;
  telegram: string;
  google: string;
  yahoo: string;
  outlook: string;
  status: string;
  operadora: string;
  titular: string;
  pacote: string;
  validacao: string;
  recarga: string;
  dispositivo: string;
  chip: string;
  obs: string;
}

export async function getChips() {
  const getUserToken = localStorage.getItem("@chip_control:token");

  if (getUserToken) {
    const response = await api.get<GetChipsReponse[]>("/listarchip", {
      headers: {
        "x-access-token": getUserToken,
      },
    });

    return response.data;
  }
}
