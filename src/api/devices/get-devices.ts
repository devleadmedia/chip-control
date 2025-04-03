import { api } from "@/services/api";

export interface GetDataDevicesResponse {
  id: number;
  imei: string;
  senha: string;
  marca: string;
  modelo: string;
  sistema_operacional: string;
  processador: string;
  sku: string;
  ram: string;
  hd: string;
  sim_card: string;
  local_compra: string;
  valor: string;
  expiracao: string;
  obs: string;
}

export async function getDevices() {
  const getUserToken = localStorage.getItem("@chip_control:token");

  const response = await api.get<GetDataDevicesResponse[]>("/listaraparelho", {
    headers: {
      "x-access-token": getUserToken,
    },
  });

  return response.data;
}
