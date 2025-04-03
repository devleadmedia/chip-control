import { UserPlus } from "lucide-react";
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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createUsers } from "@/api/users/create-users";
import { InputMessage } from "@/components/input-message";

const createUserSchema = z.object({
  name: z.string().min(1, "Preencha esse campo."),
  email: z.string().min(1, "Preencha esse campo.").email("E-mail invalido."),
  password: z.string().min(4, "Campo senha deve ter no minimo 4 caracteres."),
});

type createUserForm = z.infer<typeof createUserSchema>;

export function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { mutateAsync: createUsersFn } = useMutation({
    mutationFn: createUsers,
  });

  function handlecCreateUser(data: createUserForm) {
    const { name, email, password } = data;
    createUsersFn({ nome: name, email, senha: password });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <UserPlus size={16} />
          Novo usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar novo usuário:</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handlecCreateUser)}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid col-span-2 items-start gap-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                Nome:
                {errors.name && <InputMessage message={errors.name.message} />}
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Nome"
                {...register("name")}
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
          </div>

          <Separator />

          <DialogFooter className="flex items-center gap-2 mt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" variant="success" disabled={isSubmitting}>
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
