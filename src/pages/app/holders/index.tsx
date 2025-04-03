import { useState } from "react";
import { Building, PersonStanding, Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { EditHolders } from "./components/edit-holders";

import { useQuery } from "@tanstack/react-query";
import { getHolders } from "@/api/holders/get-holders";
import { CreateHolders } from "./components/create-holders";

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

export function Holders() {
  const [typeUser, setTypeUser] = useState<string>("PF");

  // async function handleRemove(id: number) {
  //   setHoldersData((state) => state.filter((item) => item.id !== id));

  //   try {
  //     const response = await api.delete(`/deletartitular/${id}`, {
  //       headers: {
  //         "x-access-token": data?.token,
  //       },
  //     });

  //     AlertMessage(response.data.message, "success");
  //   } catch (error: unknown) {
  //     if (error instanceof AxiosError && error.response) {
  //       AlertMessage(error.response.data.message, "error");
  //     } else {
  //       AlertMessage(
  //         "Não foi possível deletar o titular agora, tente novamente mais tarde.",
  //         "error"
  //       );
  //     }
  //   }
  // }

  const { data: getDataHoldersFn } = useQuery({
    queryKey: ["get-holders"],
    queryFn: () => getHolders(),
  });

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Titulares</h1>

        <div className="flex items-start gap-2">
          <CreateHolders />
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
      </header>

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
          {getDataHoldersFn?.map((item) => (
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
                        onClick={() => {}}
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
                  <TableCell>{item?.obs}</TableCell>
                  <TableCell>
                    <div className="text-right flex items-center justify-end gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:text-red-400"
                        onClick={() => {}}
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
