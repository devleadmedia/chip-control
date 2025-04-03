import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import { useMutation } from "@tanstack/react-query";

import { GetDataControlsResponse } from "@/api/controls/get-controls";
import { deleteControls } from "@/api/controls/delete-controls";

interface DataDeleteControls {
  onIdControls: GetDataControlsResponse;
}

export function DeleteControls({ onIdControls }: DataDeleteControls) {
  const { mutateAsync: deleteControlsFn } = useMutation({
    mutationFn: deleteControls,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Deletar{" "}
            {String(onIdControls?.numero)
              .replace(/\D/g, "")
              .replace(/(\d{2})(\d)/, "($1) $2")
              .replace(/(\d{5})(\d)/, "$1-$2")
              .replace(/(-\d{4})\d+?$/, "$1") ?? "recarga"}
            ?
          </DialogTitle>
          <DialogDescription>
            Para deletar{" "}
            {String(onIdControls?.numero)
              .replace(/\D/g, "")
              .replace(/(\d{2})(\d)/, "($1) $2")
              .replace(/(\d{5})(\d)/, "$1-$2")
              .replace(/(-\d{4})\d+?$/, "$1") ?? "recarga"}{" "}
            clique em confirmar!
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <DialogFooter className="flex items-center gap-2 mt-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="success"
            onClick={() => deleteControlsFn(onIdControls.id)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
