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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export function EditRecharge() {
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
          <DialogTitle>Editar Recarga:</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="date" className="text-start">
              Data:
            </Label>
            <Input type="date" id="date" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="value" className="text-start">
              Valor:
            </Label>
            <Input
              type="text"
              id="value"
              placeholder="Valor"
              className="col-span-3"
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="expiration" className="text-start">
              Expiração:
            </Label>
            <Input type="date" id="expiration" className="col-span-3" />
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <Label htmlFor="sistem_operation" className="text-start">
              Chip:
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chips" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Android">Chip 1</SelectItem>
                <SelectItem value="IOS">Chip 2</SelectItem>
                <SelectItem value="Microsoft">Chip 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
