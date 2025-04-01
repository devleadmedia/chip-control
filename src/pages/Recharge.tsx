import { useEffect, useState } from "react";
import { ArrowLeft, Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { NewRecharge } from "@/modals/new_recharge";
import { EditRecharge } from "@/modals/edit_recharge";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { AlertMessage } from "@/components/alert_message";
import { useAuth } from "@/hook/auth";
import { DataProps } from "@/interface/auth";
import { useContextState } from "@/hook/state";
import { IsFocusProps } from "@/interface/state";

export type RechargeProps = {
  id: number;
  numero: string;
  data: string;
  valor: string;
  expiracao: string;
  chip: string;
};

type DataRechargeProps = {
  data: DataProps;
};

export function Recharge() {
  const { data } = useAuth() as DataRechargeProps;
  const { setIsFocus } = useContextState() as IsFocusProps;
  const [rechargeData, setRechargeData] = useState<RechargeProps[]>([]);

  async function handleRemove(id: number) {
    setRechargeData((state) => state.filter((item) => item.id !== id));

    try {
      const response = await api.delete(`/deletarrecarga/${id}`, {
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
          "Não foi possível deletar o titular agora, tente novamente mais tarde.",
          "error"
        );
      }
    }
  }

  useEffect(() => {
    async function handleGetRecharge() {
      try {
        const response = await api.get("/listarrecarga", {
          headers: {
            "x-access-token": data?.token,
          },
        });
        console.log(response.data);
        setRechargeData(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          AlertMessage(error.response.data.message, "error");
        } else {
          AlertMessage(
            "Não foi possível buscar as recargas agora, tente novamente mais tarde.",
            "error"
          );
        }
      }
    }
    handleGetRecharge();
  }, [data?.token]);

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Recarga</h1>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFocus("device")}
        >
          <ArrowLeft size={16} /> Voltar
        </Button>
      </header>

      <div className="mt-10 flex items-start gap-4">
        <NewRecharge />
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Número</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Expiração</TableHead>
            <TableHead>Chip</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rechargeData?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>
                {String(item?.numero)
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d)/, "($1) $2")
                  .replace(/(\d{5})(\d)/, "$1-$2")
                  .replace(/(-\d{4})\d+?$/, "$1")}
              </TableCell>
              <TableCell>
                {new Date(item?.data).toLocaleDateString("pt-br")}
              </TableCell>
              <TableCell>
                {Number(item?.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                {new Date(item?.expiracao).toLocaleDateString("pt-br")}
              </TableCell>
              <TableCell>{item?.chip}</TableCell>
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
                  <EditRecharge />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
