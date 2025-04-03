import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserDataResponse } from "@/api/users/get-users";
import { useMutation } from "@tanstack/react-query";
import { deleteUsers } from "@/api/users/delete-users";

interface DataUsersResponse {
  dataUsers: UserDataResponse;
}

export function DeleteUsers({ dataUsers }: DataUsersResponse) {
  const { mutateAsync: deleteUsersFn } = useMutation({
    mutationFn: deleteUsers,
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="flex items-center gap-2"
          >
            <Trash size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Deletar usuário {dataUsers.nome ?? "Usuário"}?
            </DialogTitle>
            <DialogDescription>
              Confirme a remoção do {dataUsers.nome ?? "Usuário"}!
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <DialogFooter className="flex items-center gap-2">
            <DialogClose asChild>
              <Button type="submit" variant="default">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="success"
              onClick={() => deleteUsersFn(dataUsers.id)}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
