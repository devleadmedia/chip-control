import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useQuery } from "@tanstack/react-query";
import { getSmsReceiver } from "@/api/sms-receiver/get-sms-receiver";

export function SmsReceiver() {
  const { data: getSmsReceiverFn } = useQuery({
    queryKey: ["get-sms-receiver"],
    queryFn: () => getSmsReceiver(),
  });

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SMS Receiver</h1>
      </header>

      <div className="mt-10 flex items-end gap-4">
        <div className="flex text-start items-start flex-col gap-2 ">
          <Label htmlFor="number" className="text-start">
            Chips:
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Chips" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {getSmsReceiverFn?.map((item) => {
                  return (
                    <SelectItem value={item?.remetente} key={item?.id}>
                      {String(item?.remetente)
                        .replace(/\D/g, "")
                        .replace(/(\d{2})(\d)/, "($1) $2")
                        .replace(/(\d{5})(\d)/, "$1-$2")
                        .replace(/(-\d{4})\d+?$/, "$1")}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex text-start items-start flex-col gap-2 ">
          <Label htmlFor="remetente" className="text-start">
            Remetentes:
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Remetente" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {getSmsReceiverFn?.map((item) => {
                  return (
                    <SelectItem value={item?.remetente} key={item?.id}>
                      {String(item?.remetente)
                        .replace(/\D/g, "")
                        .replace(/(\d{2})(\d)/, "($1) $2")
                        .replace(/(\d{5})(\d)/, "$1-$2")
                        .replace(/(-\d{4})\d+?$/, "$1")}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex text-start items-start flex-col gap-2 ">
          <Label htmlFor="date" className="text-start">
            Data:
          </Label>
          <div className="flex items-center gap-2">
            <Input type="date" />
            <span>Até</span>
            <Input type="date" />
          </div>
        </div>

        <div className="flex text-start items-start flex-col gap-2 ">
          <Label htmlFor="message" className="text-start">
            Palavra chave:
          </Label>
          <Input
            type="text"
            id="message"
            placeholder="Mensagem"
            className="w-96"
          />
        </div>

        <Button type="button" variant="default">
          Filtrar
        </Button>
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Chip</TableHead>
            <TableHead>Remetente</TableHead>
            <TableHead>Data/Hora</TableHead>
            <TableHead>Mensagem</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {getSmsReceiverFn?.map((item) => {
            return (
              <TableRow key={item?.id}>
                <TableCell>
                  {String(item.remetente)
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d)/, "($1) $2")
                    .replace(/(\d{5})(\d)/, "$1-$2")
                    .replace(/(-\d{4})\d+?$/, "$1")}
                </TableCell>
                <TableCell>
                  {String(item.remetente)
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d)/, "($1) $2")
                    .replace(/(\d{5})(\d)/, "$1-$2")
                    .replace(/(-\d{4})\d+?$/, "$1")}
                </TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleString("pt-br")}
                </TableCell>
                <TableCell>{item.message}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
