import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputMessage } from "@/components/input-message";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth/sign-in";

const signInSchema = z.object({
  email: z.string().min(1, "Preencha esse campo.").email("E-mail invalido."),
  password: z.string().min(4, "Campo senha deve ter no minimo 4 caracteres."),
});

type signInForm = z.infer<typeof signInSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signIn,
  });

  async function signInUser(data: signInForm) {
    const { email, password } = data;

    await signInFn({ email, senha: password });
  }

  return (
    <form
      onSubmit={handleSubmit(signInUser)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Entre na sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Insira seu e-mail e senha abaixo para fazer login em sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="flex items-center gap-1">
            Email
            {errors.email && <InputMessage message={errors.email.message} />}
          </Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password" className="flex items-center gap-1">
              Senha
              {errors.password && (
                <InputMessage message={errors.password.message} />
              )}
            </Label>
          </div>
          <Input {...register("password")} id="password" type="password" />
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full">
          Entrar
        </Button>
      </div>
    </form>
  );
}
