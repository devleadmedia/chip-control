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
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hook/auth";
import { CreateUserProps } from "@/interface/auth";

const createUserSchema = z.object({
  name: z.string().min(1, "Preencha esse campo."),
  email: z.string().min(1, "Preencha esse campo.").email("E-mail invalido."),
  password: z.string().min(4, "Campo senha deve ter no minimo 4 caracteres."),
});

type createUserForm = z.infer<typeof createUserSchema>;
type HandleCreateUsersProps = {
  handleCreateUsers: ({ nome, email, senha }: CreateUserProps) => void;
};

export function NewUser() {
  const { handleCreateUsers } = useAuth() as HandleCreateUsersProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  function createUser(data: createUserForm) {
    const { name, email, password } = data;
    handleCreateUsers({ nome: name, email, senha: password });
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
        <form onSubmit={handleSubmit(createUser)}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid col-span-2 items-start gap-2">
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
              />
              {errors.name && (
                <span className="text-xs text-rose-400 font-normal">
                  {errors.name.message}
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
