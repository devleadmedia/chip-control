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
import { NewControl } from "@/modals/new_control";
import { EditControl } from "@/modals/edit_control";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { AlertMessage } from "@/components/alert_message";
import { useAuth } from "@/hook/auth";
import { DataProps } from "@/interface/auth";
import { useContextState } from "@/hook/state";
import { IsFocusProps } from "@/interface/state";

export type ControlProps = {
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
};
type DataControlsProps = {
  data: DataProps;
};

export function Control() {
  const { data } = useAuth() as DataControlsProps;
  const { setIsFocus } = useContextState() as IsFocusProps;
  const [controlData, setControlData] = useState<ControlProps[]>([]);

  async function handleRemove(id: number) {
    setControlData((state) => state.filter((item) => item.id !== id));

    try {
      const response = await api.delete(`/deletarcontrole/${id}`, {
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
          "Não foi possível deletar o controles agora, tente novamente mais tarde.",
          "error"
        );
      }
    }
  }

  useEffect(() => {
    async function handleGetControl() {
      try {
        const response = await api.get("/listarcontrole", {
          headers: {
            "x-access-token": data?.token,
          },
        });
        console.log(response.data);

        setControlData(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          AlertMessage(error.response.data.message, "error");
        } else {
          AlertMessage(
            "Não foi possível buscar os controles agora, tente novamente mais tarde.",
            "error"
          );
        }
      }
    }
    handleGetControl();
  }, [data?.token]);

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Controle</h1>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFocus("recharge")}
        >
          <ArrowLeft size={16} /> Voltar
        </Button>
      </header>

      <div className="mt-10 flex items-start gap-4">
        <NewControl />
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Número</TableHead>
            <TableHead>Operadora</TableHead>
            <TableHead>Aparelho</TableHead>
            <TableHead>Ult.Aparelho</TableHead>
            <TableHead>Ult.Recarga</TableHead>
            <TableHead>Soma Recarga</TableHead>
            <TableHead>Ult.SMS</TableHead>
            <TableHead>Ult.Whatsapp</TableHead>
            <TableHead>Data Expiração</TableHead>
            <TableHead>Data Bloqueio</TableHead>
            <TableHead>Data Distrato</TableHead>
            <TableHead>Whatsapp</TableHead>
            <TableHead>Telegram</TableHead>
            <TableHead>SMS</TableHead>
            <TableHead>Voz</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {controlData?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>
                {String(item?.numero)
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d)/, "($1) $2")
                  .replace(/(\d{5})(\d)/, "$1-$2")
                  .replace(/(-\d{4})\d+?$/, "$1")}
              </TableCell>
              <TableCell>{item?.operadora}</TableCell>
              <TableCell>{item?.aparelho}</TableCell>
              <TableCell>
                {new Date(item?.ult_aparelho).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {Number(item?.soma_recarga).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                {new Date(item?.ultima_recarga).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {new Date(item?.ult_sms).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {new Date(item?.ult_whatsapp).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {new Date(item?.data_expiracao).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {new Date(item?.data_bloqueio).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {new Date(item?.data_distrato).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {item?.status_whatsapp ? (
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
                {item?.status_telegram ? (
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
                {item?.status_sms ? (
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
                {item?.status_voz ? (
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
                  <EditControl />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
