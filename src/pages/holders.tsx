import { useEffect, useState } from "react";
import { ArrowLeft, Building, PersonStanding, Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { NewHolders } from "@/modals/new_holders";
import { EditHolders } from "@/modals/edit_holders";
import { useAuth } from "@/hook/auth";
import { DataProps } from "@/interface/auth";
import { api } from "@/services/api";
import { AlertMessage } from "@/components/alert_message";
import { AxiosError } from "axios";
import { useContextState } from "@/hook/state";
import { IsFocusProps } from "@/interface/state";

export type ListHoldersProps = {
  id: number;
  cnpj: string | null;
  cpf: string | null;
  data_nascimento: string;
  endereco: string;
  nome_razao: string;
  obs: string;
  pf: string | null;
  pj: string | null;
  status: string;
  type_user: string;
  chip: string;
  servico: string;
};

type DataHoldersProps = {
  data: DataProps;
};

export function Holders() {
  const { data } = useAuth() as DataHoldersProps;
  const { setIsFocus } = useContextState() as IsFocusProps;
  const [holdersData, setHoldersData] = useState<ListHoldersProps[]>([]);
  const [typeUser, setTypeUser] = useState<string>("PF");

  async function handleRemove(id: number) {
    setHoldersData((state) => state.filter((item) => item.id !== id));

    try {
      const response = await api.delete(`/deletartitular/${id}`, {
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
    async function handleGetHolders() {
      try {
        const response = await api.get("/listartitular", {
          headers: {
            "x-access-token": data?.token,
          },
        });
        console.log(response.data);
        setHoldersData(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          AlertMessage(error.response.data.message, "error");
        } else {
          AlertMessage(
            "Não foi possível buscar os titulares agora, tente novamente mais tarde.",
            "error"
          );
        }
      }
    }
    handleGetHolders();
  }, [data?.token]);

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Titulares</h1>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFocus("chips")}
        >
          <ArrowLeft size={16} /> Voltar
        </Button>
      </header>

      <div className="mt-10 flex items-start gap-4">
        <NewHolders />
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setTypeUser("PF")}
        >
          <PersonStanding size={16} /> Pessoa fisica
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setTypeUser("PJ")}
        >
          <Building size={16} /> Pessoa juridica
        </Button>
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>ID</TableHead>
            {typeUser === "PF" && <TableHead>PF</TableHead>}
            {typeUser === "PJ" && <TableHead>PJ</TableHead>}
            <TableHead>Nome/Razão</TableHead>
            {typeUser === "PF" && <TableHead>CPF</TableHead>}
            {typeUser === "PJ" && <TableHead>CNPJ</TableHead>}
            <TableHead>Endereço</TableHead>
            <TableHead>Data Nasc.</TableHead>
            {/* <TableHead>Serviço</TableHead>
            <TableHead>Chip</TableHead> */}
            <TableHead>OBS</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdersData?.map((item) => (
            <>
              {typeUser === item.pf && (
                <TableRow key={item?.id}>
                  <TableCell>{item?.id}</TableCell>
                  <TableCell>{item?.pf}</TableCell>
                  <TableCell>{item?.nome_razao}</TableCell>
                  <TableCell>
                    {String(item?.cpf).replace(
                      /(\d{3})(\d{3})(\d{3})(\d{2})/,
                      "$1.$2.$3-$4"
                    )}
                  </TableCell>
                  <TableCell>{item?.endereco}</TableCell>
                  <TableCell>
                    {new Date(item?.data_nascimento).toLocaleDateString(
                      "pt-br"
                    )}
                  </TableCell>
                  {/* <TableCell>{item?.servico}</TableCell>
                  <TableCell>{item?.chip}</TableCell> */}
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
                      <EditHolders />
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {typeUser === item.pj && (
                <TableRow key={item?.id}>
                  <TableCell>{item?.id}</TableCell>
                  <TableCell>{item?.pj}</TableCell>
                  <TableCell>{item?.nome_razao}</TableCell>
                  <TableCell>
                    {String(item?.cnpj).replace(
                      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                      "$1.$2.$3/$4-$5"
                    )}
                  </TableCell>
                  <TableCell>{item?.endereco}</TableCell>
                  <TableCell>{item?.data_nascimento}</TableCell>
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
                      <EditHolders />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
