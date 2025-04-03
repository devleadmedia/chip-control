import { api } from "@/services/api";
import { AlertMessage } from "@/components/alert_message";

export async function deleteRecharges(id: number) {
  const userToken = localStorage.getItem("@chip_control:token");

  const response = await api.delete(`/deletarrecarga/${id}`, {
    headers: {
      "x-access-token": userToken,
    },
  });

  AlertMessage(response.data.message, "success");
}
