import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EditDevice } from "./components/edit-devices";
import { CreateDevice } from "./components/create-devices";
import { useQuery } from "@tanstack/react-query";
import { getDevices } from "@/api/devices/get-devices";
import { DeleteDevices } from "./components/delete-devices";

export function Devices() {
  const { data: getDataDevicesFn } = useQuery({
    queryKey: ["get-devices"],
    queryFn: () => getDevices(),
  });

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dispositivos</h1>
        <CreateDevice />
      </header>

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
          {getDataDevicesFn?.map((item) => (
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
                  <DeleteDevices onIdDevices={item} />
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
