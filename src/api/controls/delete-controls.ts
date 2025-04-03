import { AlertMessage } from "@/components/alert_message";
import { api } from "@/services/api";

export async function deleteControls(id: number) {
  const userToken = localStorage.getItem("@chip_control:token");

  const response = await api.delete(`/deletarcontrole/${id}`, {
    headers: {
      "x-access-token": userToken,
    },
  });

  AlertMessage(response.data.message, "success");
}
