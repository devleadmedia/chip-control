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
import { NewDevice } from "@/modals/new_device";
import { EditDevice } from "@/modals/edit_device";
import { api } from "@/services/api";
import { AlertMessage } from "@/components/alert_message";
import { AxiosError } from "axios";
import { useAuth } from "@/hook/auth";
import { DataProps } from "@/interface/auth";
import { useContextState } from "@/hook/state";
import { IsFocusProps } from "@/interface/state";

export type DeviceProps = {
  id: number;
  imei: string;
  senha: string;
  marca: string;
  modelo: string;
  sistema_operacional: string;
  processador: string;
  sku: string;
  ram: string;
  hd: string;
  sim_card: string;
  local_compra: string;
  valor: string;
  expiracao: string;
  obs: string;
};

type DeviceDataProps = {
  data: DataProps;
};

export function Device() {
  const { data } = useAuth() as DeviceDataProps;
  const { setIsFocus } = useContextState() as IsFocusProps;
  const [deviceData, setDeviceData] = useState<DeviceProps[]>([]);

  async function handleRemove(id: number) {
    setDeviceData((state) => state.filter((item) => item.id !== id));

    try {
      const response = await api.delete(`/deletaraparelho/${id}`, {
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
          "Não foi possível deletar o aparelho agora, tente novamente mais tarde.",
          "error"
        );
      }
    }
  }

  useEffect(() => {
    async function handleGetDevice() {
      try {
        const response = await api.get("/listaraparelho", {
          headers: {
            "x-access-token": data?.token,
          },
        });
        console.log(response.data);
        setDeviceData(response.data);
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
    handleGetDevice();
  }, [data?.token]);

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Titulares</h1>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFocus("holders")}
        >
          <ArrowLeft size={16} /> Voltar
        </Button>
      </header>

      <div className="mt-10 flex items-start gap-4">
        <NewDevice />
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>ID</TableHead>
            <TableHead>IMEI</TableHead>
            <TableHead>Senha</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Sistema Operacional</TableHead>
            <TableHead>Processador</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead>HD</TableHead>
            <TableHead>Sim Card (x GB)</TableHead>
            <TableHead>Local de compra</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Expiração</TableHead>
            <TableHead>OBS</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deviceData?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item?.id}</TableCell>
              <TableCell>{item?.imei}</TableCell>
              <TableCell>{item?.senha}</TableCell>
              <TableCell>{item?.marca}</TableCell>
              <TableCell>{item?.modelo}</TableCell>
              <TableCell>{item?.sistema_operacional}</TableCell>
              <TableCell>{item?.processador}</TableCell>
              <TableCell>{item?.sku}</TableCell>
              <TableCell>{item?.ram} GB</TableCell>
              <TableCell>{item?.hd} GB</TableCell>
              <TableCell>{item?.sim_card}</TableCell>
              <TableCell>{item?.local_compra}</TableCell>
              <TableCell>
                {Number(item?.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>{item?.expiracao}</TableCell>
              <TableCell>{item?.obs}</TableCell>
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
                  <EditDevice />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
