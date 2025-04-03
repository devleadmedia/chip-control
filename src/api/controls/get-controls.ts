import { api } from "@/services/api";

export interface GetDataControlsResponse {
  id: number;
  numero: string;
  operadora: string;
  aparelho: string;
  ult_aparelho: string;
  ultima_recarga: string;
  ult_sms: string;
  ult_whatsapp: string;
  soma_recarga: string;
  data_expiracao: string;
  data_bloqueio: string;
  data_distrato: string;
  status_whatsapp: boolean;
  status_telegram: boolean;
  status_sms: boolean;
  status_voz: boolean;
}

export async function getControls() {
  const userToken = localStorage.getItem("@chip_control:token");
  const response = await api.get<GetDataControlsResponse[]>("/listarcontrole", {
    headers: {
      "x-access-token": userToken,
    },
  });

  return response.data;
}
