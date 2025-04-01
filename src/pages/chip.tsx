import { AxiosError } from "axios";
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
import { EditChip } from "@/modals/edit_chip";
import { NewChip } from "@/modals/new_chip";
import { AlertMessage } from "@/components/alert_message";
import { api } from "@/services/api";
import { useAuth } from "@/hook/auth";
import { useContextState } from "@/hook/state";
import { DataProps } from "@/interface/auth";
import { IsFocusProps } from "@/interface/state";

type UserProps = {
  id: number;
  local_de_compra: string;
  valor: string;
  numero: string;
  sms: string;
  whatsapp: string;
  telegram: string;
  google: string;
  yahoo: string;
  outlook: string;
  status: string;
  operadora: string;
  titular: string;
  pacote: string;
  validacao: string;
  recarga: string;
  dispositivo: string;
  chip: string;
  obs: string;
};
type ChipDataProps = {
  data: DataProps;
};

export function Chips() {
  const { data } = useAuth() as ChipDataProps;
  const { setIsFocus } = useContextState() as IsFocusProps;
  const [chipsData, setChipsData] = useState<UserProps[]>([]);

  async function handleRemove(id: number) {
    setChipsData((state) => state.filter((item) => item.id !== id));

    try {
      const response = await api.delete(`/deletarchip/${id}`, {
        headers: {
          "x-access-token": data?.token,
        },
      });
      console.log(response.data);
      AlertMessage(response.data.message, "success");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        AlertMessage(error.response.data.message, "error");
      } else {
        AlertMessage(
          "Não foi possível deletar o chip agora, tente novamente mais tarde.",
          "error"
        );
      }
    }
  }

  useEffect(() => {
    async function handleGetChip() {
      try {
        const response = await api.get("/listarchip", {
          headers: {
            "x-access-token": data?.token,
          },
        });
        setChipsData(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          AlertMessage(error.response.data.message, "error");
        } else {
          AlertMessage(
            "Não foi possível buscar os chips agora, tente novamente mais tarde.",
            "error"
          );
        }
      }
    }
    handleGetChip();
  }, [data?.token]);

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chips</h1>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFocus("usuario")}
        >
          <ArrowLeft size={16} /> Voltar
        </Button>
      </header>

      <div className="mt-10">
        <NewChip />
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>ID</TableHead>
            <TableHead>Local de Compra</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Número</TableHead>
            {/* <TableHead>Operadora</TableHead>
            <TableHead>Titular</TableHead>
            <TableHead>Pacote</TableHead>
            <TableHead>Validação</TableHead>
            <TableHead>Chip</TableHead>
            <TableHead>Dispositivo</TableHead>
            <TableHead>Recarga</TableHead> */}
            <TableHead>SMS</TableHead>
            <TableHead>Whatsapp</TableHead>
            <TableHead> Telegram</TableHead>
            <TableHead>Google</TableHead>
            <TableHead>Yahoo</TableHead>
            <TableHead>Outlook</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>OBS</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chipsData?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item?.id}</TableCell>
              <TableCell>{item?.local_de_compra}</TableCell>
              <TableCell>
                {Number(item?.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                {String(item?.numero)
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d)/, "($1) $2")
                  .replace(/(\d{5})(\d)/, "$1-$2")
                  .replace(/(-\d{4})\d+?$/, "$1")}
              </TableCell>
              {/* <TableCell>{item?.operadora}</TableCell>
              <TableCell>{item?.titular}</TableCell>
              <TableCell>{item?.pacote}</TableCell>
              <TableCell>{item?.validacao}</TableCell>
              <TableCell>{item?.chip}</TableCell>
              <TableCell>{item?.dispositivo}</TableCell>
              <TableCell>{item?.recarga}</TableCell> */}
              <TableCell>
                {item?.sms ? (
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
                {item?.whatsapp ? (
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
                {item?.telegram ? (
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
                {item?.google ? (
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
                {item?.yahoo ? (
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
                {item?.outlook ? (
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
                {item?.status ? (
                  <span className="text-sm font-normal text-green-400">
                    Ativo
                  </span>
                ) : (
                  <span className="text-sm font-normal text-rose-600">
                    Inativo
                  </span>
                )}
              </TableCell>
              <TableCell>{item?.obs}</TableCell>
              <TableCell></TableCell>
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
                  <EditChip />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
