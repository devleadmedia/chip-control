import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EditControl } from "./components/edit-controls";
import { useQuery } from "@tanstack/react-query";
import { getControls } from "@/api/controls/get-controls";
import { CreateControl } from "./components/create-controls";
import { DeleteControls } from "./components/delete-controls";

export function Controls() {
  const { data: getDataControlsFn } = useQuery({
    queryKey: ["get-controls"],
    queryFn: () => getControls(),
  });

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Controles</h1>

        <CreateControl />
      </header>

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
          {getDataControlsFn?.map((item) => (
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
                <div className="text-right flex items-center justify-end gap-2">
                  <DeleteControls onIdControls={item} />
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
