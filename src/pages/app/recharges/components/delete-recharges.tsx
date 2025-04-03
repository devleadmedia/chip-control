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

import { GetRechargesResponse } from "@/api/recharges/get-recharges";
import { deleteRecharges } from "@/api/recharges/delete-recharges";

interface DataDeleteRecharges {
  onIdRecharges: GetRechargesResponse;
}

export function DeleteRecharges({ onIdRecharges }: DataDeleteRecharges) {
  const { mutateAsync: deleteRechargesFn } = useMutation({
    mutationFn: deleteRecharges,
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
            {String(onIdRecharges?.numero)
              .replace(/\D/g, "")
              .replace(/(\d{2})(\d)/, "($1) $2")
              .replace(/(\d{5})(\d)/, "$1-$2")
              .replace(/(-\d{4})\d+?$/, "$1") ?? "recarga"}
            ?
          </DialogTitle>
          <DialogDescription>
            Para deletar{" "}
            {String(onIdRecharges?.numero)
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
            onClick={() => deleteRechargesFn(onIdRecharges.id)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
