import { api } from "@/services/api";

import { AlertMessage } from "@/components/alert_message";

export async function deleteUsers(id: number) {
  const userToken = localStorage.getItem("@chip_control:token");

  const response = await api.delete(`/deleteuser/${id}`, {
    headers: {
      "x-access-token": userToken,
    },
  });

  AlertMessage(
    response.data.message ?? "Usuário deletado com sucesso!",
    "success"
  );
}
