import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import { GetChipsReponse } from "@/api/chips/get-chips";

const editChipSchema = z.object({
  place_of_purchase: z.string().min(1, "Preencha esse campo."),
  phone: z.string().min(1, "Preencha esse campo."),
  value: z.string().min(1, "Preencha esse campo."),
  sms: z.string().min(1, "Preencha esse campo."),
  zap: z.string().min(1, "Preencha esse campo."),
  telegram: z.string().min(1, "Preencha esse campo."),
  google: z.string().min(1, "Preencha esse campo."),
  yahoo: z.string().min(1, "Preencha esse campo."),
  outlook: z.string().min(1, "Preencha esse campo."),
  obs: z.string().min(1, "Preencha esse campo."),
  status: z.string().min(1, "Preencha esse campo."),
  id: z.string().min(1, "Preencha esse campo."),
  type_user: z.string().min(1, "Preencha esse campo."),
  operator: z.string().min(1, "Preencha esse campo."),
  package: z.string().min(1, "Preencha esse campo."),
  date_validation: z.string().min(1, "Preencha esse campo."),
  facebook: z.string().min(1, "Preencha esse campo."),
  x: z.string().min(1, "Preencha esse campo."),
  linkedin: z.string().min(1, "Preencha esse campo."),
  instagram: z.string().min(1, "Preencha esse campo."),
  devices: z.string().min(1, "Preencha esse campo."),
  chips: z.string().min(1, "Preencha esse campo."),
});

type editChipForm = z.infer<typeof editChipSchema>;

interface EditChipsResponse {
  dataEditChips: GetChipsReponse;
}

export function EditChip({ dataEditChips }: EditChipsResponse) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editChipForm>({
    resolver: zodResolver(editChipSchema),
    defaultValues: {},
  });

  console.log(dataEditChips);

  async function handleEditChips(data: editChipForm) {
    console.log(data, errors);
  }

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
          <DialogTitle>Editar chip:</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEditChips)}>
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
              <Label htmlFor="place_of_purchase" className="text-start">
                Local de Compra:
              </Label>
              <Input
                type="text"
                id="place_of_purchase"
                placeholder="Local de Compra"
                className="col-span-3"
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="number" className="text-start">
                Número:
              </Label>
              <Input
                type="text"
                id="number"
                placeholder="11900000-0000"
                className="col-span-3"
                maxLength={11}
                {...register("phone")}
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="value" className="text-start">
                Valor:
              </Label>
              <Input
                type="text"
                id="value"
                placeholder="20"
                className="col-span-3"
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status" className="text-start">
                Status:
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_sms" className="text-start">
                SMS:
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="sms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_zap" className="text-start">
                Zap:
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="zap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_telegram" className="text-start">
                Telegram:
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="telegram" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_google" className="text-start">
                Google:
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="google" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 col-span-3 gap-3">
              <div className="col-span-2 gap-2">
                <Label htmlFor="status_yahoo" className="text-start">
                  Yahoo:
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="yahoo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 gap-2">
                <Label htmlFor="status_outlook" className="text-start">
                  Outlook:
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="outlook" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-span-3 gap-2">
              <Label htmlFor="message">OBS:</Label>
              <Textarea placeholder="OBS." id="message" />
            </div>
          </div>

          <Separator />

          <DialogFooter className="flex items-center gap-2 mt-2">
            <Button type="button" variant="outline">
              Histórico recargas
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} variant="success">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
