import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useQuery } from "@tanstack/react-query";
import { getRecharges } from "@/api/recharges/get-recharges";
import { DeleteRecharges } from "./components/delete-recharges";
import { CreateRecharges } from "./components/create-recharges";

import { EditRecharges } from "./components/edit-recharges";

export type RechargeProps = {
  id: number;
  numero: string;
  data: string;
  valor: string;
  expiracao: string;
  chip: string;
};

export function Recharges() {
  const { data: getRechargesFn } = useQuery({
    queryKey: ["get-recharges"],
    queryFn: () => getRecharges(),
  });

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Recargas</h1>
        <CreateRecharges />
      </header>

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
          {getRechargesFn?.map((item) => (
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
                  <DeleteRecharges onIdRecharges={item} />
                  <EditRecharges onDataRecharges={item} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
