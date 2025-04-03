import { Edit } from "lucide-react";
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
  DialogClose,
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

import { InputMessage } from "@/components/input-message";
import { useMutation } from "@tanstack/react-query";
import { editUsers } from "@/api/users/edit-users";
import { UserDataResponse } from "@/api/users/get-users";

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
interface EditUsersDataResponse {
  dataEditUsers: UserDataResponse;
}

export function EditUser({ dataEditUsers }: EditUsersDataResponse) {
  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<createUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: dataEditUsers?.nome,
      email: dataEditUsers?.email,
    },
  });

  const { mutateAsync: editUsersFn } = useMutation({
    mutationFn: editUsers,
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

    editUsersFn({
      cidade: city,
      datanascimento: date_nasc,
      email,
      genero: gender,
      nome: name,
      cargo: office,
      senha: password,
      tel: phone,
      sobrenome: surname,
      uf,
    });
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
          <DialogTitle>Editar usuário: {dataEditUsers?.nome}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(editUser)}>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="grid col-span-1 items-start gap-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                Nome:
                {errors.name && <InputMessage message={errors.name.message} />}
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Nome"
                {...register("name")}
                defaultValue={dataEditUsers?.nome}
              />
            </div>
            <div className="grid col-span-1 items-start gap-2">
              <Label htmlFor="surname" className="flex items-center gap-2">
                Sobrenome:
                {errors.surname && (
                  <InputMessage message={errors.surname.message} />
                )}
              </Label>
              <Input
                type="text"
                id="surname"
                placeholder="Sobrenome"
                {...register("surname")}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                E-mail:
                {errors.email && (
                  <InputMessage message={errors.email.message} />
                )}
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="E-mail"
                {...register("email")}
                defaultValue={dataEditUsers?.email}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                Senha:
                {errors.password && (
                  <InputMessage message={errors.password.message} />
                )}
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Senha"
                {...register("password")}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                Telefone:
                {errors.phone && (
                  <InputMessage message={errors.phone.message} />
                )}
              </Label>
              <Input
                type="text"
                id="phone"
                placeholder="11900000000"
                maxLength={11}
                {...register("phone")}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="date_nasc" className="flex items-center gap-2">
                Data Nasc.:
                {errors.date_nasc && (
                  <InputMessage message={errors.date_nasc.message} />
                )}
              </Label>
              <Input type="date" id="date_nasc" {...register("date_nasc")} />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="uf" className="flex items-center gap-2">
                Endereço:
                {errors.uf && <InputMessage message={errors.uf.message} />}
              </Label>
              <Input
                type="text"
                id="uf"
                placeholder="Endereço"
                {...register("uf")}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="city" className="flex items-center gap-2">
                Cidade:
                {errors.city && <InputMessage message={errors.city.message} />}
              </Label>
              <Input
                type="text"
                id="city"
                placeholder="Cidade"
                {...register("city")}
              />
            </div>
            <div className="grid col-span-1 items-center gap-2">
              <Label htmlFor="gender" className="flex items-center gap-2">
                Gênero:
                {errors.gender && (
                  <InputMessage message={errors.gender.message} />
                )}
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="office" className="flex items-center gap-2">
                Cargo:
                {errors.office && (
                  <InputMessage message={errors.office.message} />
                )}
              </Label>
              <Input
                type="text"
                id="office"
                placeholder="Cargo"
                {...register("office")}
              />
            </div>
          </div>

          <Separator />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" variant="success">
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
