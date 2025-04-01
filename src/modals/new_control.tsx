import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Bolt } from "lucide-react";

export function NewControl() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Bolt size={16} />
          Novo controle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar novo controle:</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="sistem_operation" className="text-start">
              Número:
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="(00) 00000-0000" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="(11)9 0000-0000">(11)9 0000-0000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="operator" className="text-start">
              Operadora:
            </Label>
            <Input
              type="text"
              id="operator"
              placeholder="Operadora"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="device" className="text-start">
              Aparelho:
            </Label>
            <Input
              type="text"
              id="device"
              placeholder="Aparelho"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="last_recharge" className="text-start">
              Ult. Recarga:
            </Label>
            <Input type="date" id="last_recharge" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="status_sms" className="text-start">
              Status SMS:
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ativo/Inativo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="status_zap" className="text-start">
              Status Zap:
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ativo/Inativo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="status_telegram" className="text-start">
              Status telegram:
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ativo/Inativo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="status_voz" className="text-start">
              Status voz:
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ativo/Inativo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="sum_recharge" className="text-start">
              Soma recarga:
            </Label>
            <Input
              type="text"
              id="sum_recharge"
              placeholder="Soma recarga"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="date_termination" className="text-start">
              Data distrato:
            </Label>
            <Input type="date" id="date_termination" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="date_block" className="text-start">
              Data bloqueio:
            </Label>
            <Input type="date" id="date_block" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="date_expiration" className="text-start">
              Data expiração:
            </Label>
            <Input type="date" id="date_expiration" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="last_device" className="text-start">
              Ult.Aparelho:
            </Label>
            <Input type="date" id="last_device" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="last_whatsapp" className="text-start">
              Ult.Whatsapp
            </Label>
            <Input type="date" id="last_whatsapp" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="last_sms" className="text-start">
              Ult.SMS:
            </Label>
            <Input type="date" id="last_sms" className="col-span-3" />
          </div>
        </div>

        <Separator />

        <DialogFooter>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
