import { Cpu } from "lucide-react";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { HandleNewChipProps } from "@/interface/auth";
// import { useAuth } from "@/hook/auth";

const createChipSchema = z.object({
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

type createChipForm = z.infer<typeof createChipSchema>;

// type handleCreateNewChipProps = {
//   handleNewChip: ({
//     place_of_purchase,
//     phone,
//     value,
//     sms,
//     zap,
//     telegram,
//     google,
//     yahoo,
//     outlook,
//     obs,
//     status,
//     id,
//   }: HandleNewChipProps) => void;
// };

export function NewChip() {
  // const { handleNewChip } = useAuth() as handleCreateNewChipProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<createChipForm>({
    resolver: zodResolver(createChipSchema),
  });

  function newChip(data: createChipForm) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Cpu size={16} />
          Novo chip
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar novo chip:</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(newChip)}>
          <div className="grid grid-cols-4 gap-4 py-4">
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="id" className="text-start">
                ID:
              </Label>
              <Input
                type="text"
                id="id"
                placeholder="ID"
                className={`${"col-span-3"} ${
                  errors.id && "border-rose-400 bg-rose-100"
                }`}
                {...register("id")}
              />
              {errors.id && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.id.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="place_of_purchase" className="text-start">
                Local de Compra:
              </Label>
              <Input
                type="text"
                id="place_of_purchase"
                placeholder="Local de Compra"
                className={`${"col-span-3"} ${
                  errors.place_of_purchase && "border-rose-400 bg-rose-100"
                }`}
                {...register("place_of_purchase")}
              />
              {errors.place_of_purchase && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.place_of_purchase.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="number" className="text-start">
                Número:
              </Label>
              <Input
                type="text"
                id="number"
                placeholder="1190000-0000"
                className={`${"col-span-3"} ${
                  errors.phone && "border-rose-400 bg-rose-100"
                }`}
                maxLength={11}
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="value" className="text-start">
                Valor:
              </Label>
              <Input
                type="text"
                id="value"
                placeholder="20"
                className={`${"col-span-3"} ${
                  errors.value && "border-rose-400 bg-rose-100"
                }`}
                {...register("value")}
              />
              {errors.value && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.value.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status" className="text-start">
                Status:
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.status.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_sms" className="text-start">
                SMS:
              </Label>
              <Controller
                name="sms"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.sms && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.sms.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_zap" className="text-start">
                Zap:
              </Label>
              <Controller
                name="zap"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.zap && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.zap.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_telegram" className="text-start">
                Telegram:
              </Label>
              <Controller
                name="telegram"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.telegram && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.telegram.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_google" className="text-start">
                Google:
              </Label>
              <Controller
                name="google"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.google && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.google.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_yahoo" className="text-start">
                Yahoo:
              </Label>
              <Controller
                name="yahoo"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.yahoo && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.yahoo.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_outlook" className="text-start">
                Outlook:
              </Label>
              <Controller
                name="outlook"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.outlook && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.outlook.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="holders" className="text-start">
                Titulares:
              </Label>
              <Controller
                name="type_user"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="PF/PJ" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="pf">PF</SelectItem>
                        <SelectItem value="pj">PJ</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type_user && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.type_user.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="status_outlook" className="text-start">
                Operadora:
              </Label>
              <Controller
                name="operator"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Operadora" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="vivo">Vivo</SelectItem>
                        <SelectItem value="claro">Claro</SelectItem>
                        <SelectItem value="tim">Tim</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.operator && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.operator.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="package" className="text-start">
                Pacote:
              </Label>
              <Input
                type="text"
                id="package"
                placeholder="Pacote"
                className={`${"col-span-3"} ${
                  errors.package && "border-rose-400 bg-rose-100"
                }`}
                {...register("package")}
              />
              {errors.package && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.package.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="date_validation" className="text-start">
                Data Validação:
              </Label>
              <Input
                type="date"
                id="date_validation"
                className={`${"col-span-3"} ${
                  errors.date_validation && "border-rose-400 bg-rose-100"
                }`}
                {...register("date_validation")}
              />
              {errors.date_validation && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.date_validation.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="facebook" className="text-start">
                Facebook:
              </Label>
              <Controller
                name="facebook"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.facebook && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.facebook.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="x" className="text-start">
                X:
              </Label>
              <Controller
                name="x"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.x && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.x.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="linkedin" className="text-start">
                Linkedin:
              </Label>
              <Controller
                name="linkedin"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.linkedin && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.linkedin.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="instagram" className="text-start">
                Instagram:
              </Label>
              <Controller
                name="instagram"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.instagram && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.instagram.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="device" className="text-start">
                Dispositivos:
              </Label>
              <Controller
                name="devices"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativo/Inativo" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.devices && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.devices.message}
                </span>
              )}
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <Label htmlFor="chips" className="text-start">
                Chips:
              </Label>
              <Controller
                name="chips"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chips" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.status && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="chip 1">Chip 1</SelectItem>
                        <SelectItem value="chip 2">Chip 2</SelectItem>
                        <SelectItem value="chip 3">Chip 3</SelectItem>
                        <SelectItem value="chip 4">Chip 4</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.chips && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.chips.message}
                </span>
              )}
            </div>
            <div className="col-span-4 gap-2">
              <Label htmlFor="message">OBS:</Label>
              <Textarea
                placeholder="OBS."
                id="message"
                {...register("obs")}
                className={`${"col-span-3"} ${
                  errors.obs && "border-rose-400 bg-rose-100"
                }`}
              />
            </div>
            {errors.obs && (
              <span className="text-xs text-rose-400 font-normal">
                {errors.obs.message}
              </span>
            )}
          </div>

          <Separator />

          <DialogFooter className="mt-4">
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
