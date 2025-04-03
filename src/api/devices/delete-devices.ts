import { AlertMessage } from "@/components/alert_message";
import { api } from "@/services/api";

export async function deleteDevices(id: number) {
  const getUserToken = localStorage.getItem("@chip_control:token");

  const response = await api.delete(`/deletaraparelho/${id}`, {
    headers: {
      "x-access-token": getUserToken,
    },
  });

  AlertMessage(response.data.message, "success");
}
