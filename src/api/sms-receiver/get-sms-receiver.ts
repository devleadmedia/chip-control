import { api } from "@/services/api";

interface GetDataSmsReceiverResponse {
  id: number;
  message: string;
  remetente: string;
  createdAt: string;
}

export async function getSmsReceiver() {
  const userToken = localStorage.getItem("@chip_control:token");

  const response = await api.get<GetDataSmsReceiverResponse[]>("/showsms", {
    headers: {
      "x-access-token": userToken,
    },
  });

  return response.data;
}
