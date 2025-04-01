import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode_toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Logo from "@/assets/logo.png";
import { useAuth } from "@/hook/auth";
import { SignInProps } from "@/interface/auth";

const createUserSchema = z.object({
  email: z.string().min(1, "Preencha esse campo.").email("E-mail invalido."),
  password: z.string().min(4, "Campo senha deve ter no minimo 4 caracteres."),
});

type createUserForm = z.infer<typeof createUserSchema>;
type HandleSignInProps = {
  handleSignIn: ({ email, senha }: SignInProps) => void;
};

export function SignIn() {
  const { handleSignIn } = useAuth() as HandleSignInProps;
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function signIn(data: createUserForm) {
    const { email, password } = data;
    handleSignIn({ email, senha: password });
  }

  return (
    <div className="full h-screen max-w-7xl mx-auto py-10 px-3">
      <header className="flex items-end justify-between">
        <img className="w-52" src={Logo} alt="Chip Control" />

        <ModeToggle />
      </header>

      <main className="w-full mt-52">
        <form
          onSubmit={handleSubmit(signIn)}
          className="flex items-center justify-center flex-col gap-7"
        >
          <h1 className="text-3xl text-center font-bold">Chip Control</h1>
          <div className="w-72 flex flex-col items-start gap-2">
            <Label htmlFor="email">E-mail:</Label>
            <Input
              type="email"
              id="email"
              className={errors.email && "border-rose-400 bg-rose-100"}
              placeholder="Seu e-mail"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-rose-400 font-normal">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="w-72 flex flex-col items-start gap-2">
            <Label htmlFor="password">Senha:</Label>
            <div className="w-full flex items-center gap-1">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Sua senha"
                className={errors.password && "border-rose-400 bg-rose-100"}
                {...register("password")}
              />
              {showPassword ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowPassword(false)}
                      >
                        <EyeOff />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Esconder senha</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowPassword(true)}
                      >
                        <Eye />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visualizar senha</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {errors.password && (
              <span className="text-xs text-rose-400 font-normal">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" variant="outline" className="w-72">
            Entrar
          </Button>
        </form>
      </main>
    </div>
  );
}
