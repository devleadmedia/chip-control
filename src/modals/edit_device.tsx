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
import { Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function EditDevice() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex items-center gap-2"
        >
          <Edit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar aparelho:</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="name" className="text-start">
              ID:
            </Label>
            <Input
              type="text"
              id="id"
              placeholder="ID"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="imei" className="text-start">
              IMEI:
            </Label>
            <Input
              type="text"
              id="imei"
              placeholder="IMEI"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="password" className="text-start">
              Senha:
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Senha"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="brand" className="text-start">
              Marca:
            </Label>
            <Input
              type="text"
              id="brand"
              placeholder="Marca"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="model" className="text-start">
              Modelo:
            </Label>
            <Input
              type="text"
              id="model"
              placeholder="Modelo"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="sistem_operation" className="text-start">
              Sistema operacional:
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sistema operacional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Android">Android</SelectItem>
                <SelectItem value="IOS">IOS</SelectItem>
                <SelectItem value="Microsoft">Microsoft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="processor" className="text-start">
              Modelo:
            </Label>
            <Input
              type="text"
              id="processor"
              placeholder="Processador"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="sku" className="text-start">
              SKU:
            </Label>
            <Input
              type="text"
              id="sku"
              placeholder="SKU"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="ram" className="text-start">
              RAM:
            </Label>
            <Input
              type="text"
              id="ram"
              placeholder="RAM"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="hd" className="text-start">
              HD:
            </Label>
            <Input
              type="text"
              id="hd"
              placeholder="HD"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="sim_card" className="text-start">
              Sim Card (x GB):
            </Label>
            <Input
              type="text"
              id="sim_card"
              placeholder="Sim Card (x GB)"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="place_of_purchase" className="text-start">
              Local de compra:
            </Label>
            <Input
              type="text"
              id="place_of_purchase"
              placeholder="Local de compra"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="value" className="text-start">
              Valor:
            </Label>
            <Input
              type="text"
              id="value"
              placeholder="Valor"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="expiration" className="text-start">
              Expiração:
            </Label>
            <Input type="date" id="expiration" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="status_sms" className="text-start">
              Status:
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
          <div className="col-span-3 gap-2">
            <Label htmlFor="message">OBS:</Label>
            <Textarea placeholder="OBS." id="message" />
          </div>
        </div>

        <Separator />

        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
