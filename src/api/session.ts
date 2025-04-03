import { api } from "@/services/api";

export async function session() {
  const getDataUser = localStorage.getItem("@chip_control:user");

  if (getDataUser) {
    const user = JSON.parse(getDataUser);

    const response = await api.get("/session", {
      headers: {
        "x-access-token": user.token,
      },
    });

    return response.data;
  }
}
