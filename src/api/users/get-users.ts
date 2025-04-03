import { api } from "@/services/api";

export interface UserDataResponse {
  id: number;
  nome: string;
  email: string;
  actived: boolean;
}

export async function getUsers() {
  const response = await api.get<UserDataResponse[]>("/userlist");

  return response.data;
}
