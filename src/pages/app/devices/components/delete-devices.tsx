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
import { GetDataDevicesResponse } from "@/api/devices/get-devices";
import { useMutation } from "@tanstack/react-query";
import { deleteDevices } from "@/api/devices/delete-devices";

interface DataDeleteDevices {
  onIdDevices: GetDataDevicesResponse;
}

export function DeleteDevices({ onIdDevices }: DataDeleteDevices) {
  const { mutateAsync: deleteDevicesFn } = useMutation({
    mutationFn: deleteDevices,
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
          <DialogTitle>Deletar dispositivo:</DialogTitle>
          <DialogDescription>
            Para deletar o dispositivo clique em confirmar!
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
            onClick={() => deleteDevicesFn(onIdDevices.id)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
