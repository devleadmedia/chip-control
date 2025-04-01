import { useState } from "react";
import { Edit } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

export function EditHolders() {
  const [typeUser, setTypeUser] = useState<string>("PF");

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
          <DialogTitle>Editar titular:</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="status" className="text-start">
              PF/PJ:
            </Label>
            <Select value={typeUser} onValueChange={setTypeUser}>
              <SelectTrigger>
                <SelectValue placeholder="PF" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PF">PF</SelectItem>
                <SelectItem value="PJ">PJ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="name" className="text-start">
              Nome:
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Nome"
              className="col-span-3"
            />
          </div>
          {typeUser === "PF" && (
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="cpf" className="text-start">
                CPF:
              </Label>
              <Input
                type="text"
                id="cpf"
                placeholder="000.000.000-00"
                className="col-span-3"
              />
            </div>
          )}
          {typeUser === "PJ" && (
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="cnpj" className="text-start">
                CNPJ:
              </Label>
              <Input
                type="text"
                id="cnpj"
                placeholder="00.000.000/0001-00"
                className="col-span-3"
              />
            </div>
          )}
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="address" className="text-start">
              Endereço:
            </Label>
            <Input
              type="text"
              id="address"
              placeholder="Endereço"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="date" className="text-start">
              Data Nasc:
            </Label>
            <Input type="date" id="date" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="status" className="text-start">
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
