import { Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { EditChip } from "./components/edit-chips";
import { useQuery } from "@tanstack/react-query";
import { getChips } from "@/api/chips/get-chips";
import { CreateChips } from "./components/create-chips";

export function Chips() {
  // async function handleRemove(id: number) {
  //   setChipsData((state) => state.filter((item) => item.id !== id));

  //   try {
  //     const response = await api.delete(`/deletarchip/${id}`, {
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
  //         "Não foi possível deletar o chip agora, tente novamente mais tarde.",
  //         "error"
  //       );
  //     }
  //   }
  // }

  const { data: getChipsDataFn } = useQuery({
    queryKey: ["get-chips"],
    queryFn: () => getChips(),
  });

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chips</h1>
        <CreateChips />
      </header>

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
          {getChipsDataFn?.map((item) => (
            <TableRow>
              <TableCell>{item?.id}</TableCell>
              <TableCell>{item?.local_de_compra}</TableCell>
              <TableCell>
                {Number(item.valor).toLocaleString("pt-BR", {
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
                    onClick={() => {}}
                  >
                    <Trash size={16} />
                  </Button>
                  <EditChip dataEditChips={item} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
