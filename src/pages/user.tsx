import { Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { NewUser } from "@/modals/new_user";
import { AlertMessage } from "@/components/alert_message";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { useAuth } from "@/hook/auth";
import { DataProps } from "@/interface/auth";

type UserProps = {
  id: number;
  nome: string;
  email: string;
  actived: boolean;
};
type UserDataProps = {
  data: DataProps;
};

export function User() {
  const { data } = useAuth() as UserDataProps;
  const [dataUser, setDataUser] = useState<UserProps[]>([]);

  async function handleRemove(id: number) {
    setDataUser((state) => state.filter((item) => item.id !== id));

    try {
      const response = await api.delete(`${"/deleteuser/${id}"}`, {
        headers: {
          "x-access-token": data?.token,
        },
      });
      AlertMessage(response.data.message, "success");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        AlertMessage(error.response.data.message, "error");
      } else {
        AlertMessage(
          "Não foi possível deletar o usuários agora, tente novamente mais tarde.",
          "error"
        );
      }
    }
  }

  useEffect(() => {
    async function handleGetUsers() {
      try {
        const response = await api.get("/userlist");
        console.log(response.data);
        setDataUser(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          AlertMessage(error.response.data.message, "error");
        } else {
          AlertMessage(
            "Não foi possível buscar pelos usuários agora, tente novamente mais tarde.",
            "error"
          );
        }
      }
    }
    handleGetUsers();
  }, [data?.token]);

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuário</h1>
      </header>

      <div className="mt-10">
        <NewUser />
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataUser?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item?.nome}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>
                {item?.actived ? (
                  <span className="text-sm font-normal text-green-400">
                    Ativo
                  </span>
                ) : (
                  <span className="text-sm font-normal text-rose-600">
                    Inativo
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="text-right flex items-center justify-end gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:text-red-400"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash size={16} />
                  </Button>
                  <Switch defaultChecked={item?.actived} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
