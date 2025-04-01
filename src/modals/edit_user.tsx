import { UserPen } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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

import { useAuth } from "@/hook/auth";
import { useEffect } from "react";
import { DataProps, EditUserProps } from "@/interface/auth";

const createUserSchema = z.object({
  name: z.string().min(1, "Preencha esse campo."),
  surname: z.string().min(1, "Preencha esse campo."),
  email: z.string().min(1, "Preencha esse campo.").email("E-mail invalido."),
  password: z.string().min(4, "Campo senha deve ter no minimo 4 caracteres."),
  phone: z.string().min(1, "Preencha esse campo."),
  date_nasc: z.string().min(1, "Preencha esse campo."),
  uf: z.string().min(1, "Preencha esse campo."),
  city: z.string().min(1, "Preencha esse campo."),
  gender: z.string().min(1, "Selecione 1 item"),
  office: z.string().min(1, "Preencha esse campo."),
});

type createUserForm = z.infer<typeof createUserSchema>;
type AuthProps = {
  data: DataProps;
  handleEditUsers: ({
    city,
    date_nasc,
    email,
    gender,
    name,
    office,
    password,
    phone,
    surname,
    uf,
  }: EditUserProps) => void;
};

export function EditUser() {
  const { data, handleEditUsers } = useAuth() as AuthProps;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<createUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: data?.nome,
      email: data?.email,
    },
  });

  function editUser(data: createUserForm) {
    const {
      city,
      date_nasc,
      email,
      gender,
      name,
      office,
      password,
      phone,
      surname,
      uf,
    } = data;

    handleEditUsers({
      city,
      date_nasc,
      email,
      gender,
      name,
      office,
      password,
      phone,
      surname,
      uf,
    });
  }

  useEffect(() => {
    setValue("name", data?.nome);
    setValue("email", data?.email);
  }, [setValue, data?.nome, data?.email]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex items-center gap-2"
        >
          <UserPen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar usuário: {data?.nome}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(editUser)}>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="grid col-span-1 items-start gap-2">
              <Label htmlFor="name" className="text-start">
                Nome:
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Nome"
                className={`${"col-span-3"} ${
                  errors.name && "border-rose-400 bg-rose-100"
                }`}
                {...register("name")}
                defaultValue={data?.nome}
              />
              {errors.name && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid col-span-1 items-start gap-2">
              <Label htmlFor="surname" className="text-start">
                Sobrenome:
              </Label>
              <Input
                type="text"
                id="surname"
                placeholder="Sobrenome"
                className={`${"col-span-3"} ${
                  errors.surname && "border-rose-400 bg-rose-100"
                }`}
                {...register("surname")}
              />
              {errors.surname && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.surname.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="email" className="text-start">
                E-mail:
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="E-mail"
                className={`${"col-span-3"} ${
                  errors.email && "border-rose-400 bg-rose-100"
                }`}
                {...register("email")}
                defaultValue={data?.email}
              />
              {errors.email && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="password" className="text-start">
                Senha:
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Senha"
                className={`${"col-span-3"} ${
                  errors.password && "border-rose-400 bg-rose-100"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="phone" className="text-start">
                Telefone:
              </Label>
              <Input
                type="text"
                id="phone"
                placeholder="11900000000"
                maxLength={11}
                className={`${"col-span-3"} ${
                  errors.phone && "border-rose-400 bg-rose-100"
                }`}
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="date_nasc" className="text-start">
                Data Nasc.:
              </Label>
              <Input
                type="date"
                id="date_nasc"
                className={`${"col-span-3"} ${
                  errors.date_nasc && "border-rose-400 bg-rose-100"
                }`}
                {...register("date_nasc")}
              />
              {errors.date_nasc && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.date_nasc.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="uf" className="text-start">
                Endereço:
              </Label>
              <Input
                type="text"
                id="uf"
                className={`${"col-span-3"} ${
                  errors.uf && "border-rose-400 bg-rose-100"
                }`}
                placeholder="Endereço"
                {...register("uf")}
              />
              {errors.uf && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.uf.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="city" className="text-start">
                Cidade:
              </Label>
              <Input
                type="text"
                id="city"
                className={`${"col-span-3"} ${
                  errors.city && "border-rose-400 bg-rose-100"
                }`}
                placeholder="Cidade"
                {...register("city")}
              />
              {errors.city && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="grid col-span-1 items-center gap-2">
              <Label htmlFor="gender" className="text-start">
                Gênero:
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gênero" />
                    </SelectTrigger>
                    <SelectContent
                      className={`${"col-span-3"} ${
                        errors.gender && "border-rose-400 bg-rose-100"
                      }`}
                    >
                      <SelectGroup>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.gender.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="office" className="text-start">
                Cargo:
              </Label>
              <Input
                type="text"
                id="office"
                className={`${"col-span-3"} ${
                  errors.office && "border-rose-400 bg-rose-100"
                }`}
                placeholder="Cargo"
                {...register("office")}
              />
              {errors.office && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.office.message}
                </span>
              )}
            </div>
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
