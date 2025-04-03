import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Switch } from "@/components/ui/switch";

import { Skeleton } from "@/components/ui/skeleton";

import { CreateUser } from "@/pages/app/users/components/create-users";

import { getUsers } from "@/api/users/get-users";
import { DeleteUsers } from "./components/delete-users";
import { EditUser } from "./components/edit-users";

export function User() {
  const { data: getUsersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
  });

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuário</h1>
        <CreateUser />
      </header>

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoadingUsers ? (
            <>
              <TableCell>
                <Skeleton className="w-10 h-4" />
              </TableCell>

              <TableCell>
                <Skeleton className="w-64 h-4 ml-10" />
              </TableCell>

              <TableCell>
                <Skeleton className="w-10 h-4" />
              </TableCell>

              <TableCell>
                <div className="text-right flex items-center justify-end gap-4">
                  <Skeleton className="w-10 h-10 rounded-md" />
                  <Skeleton className="w-10 h-10 rounded-md" />
                  <Skeleton className="w-10 h-10 rounded-md" />
                </div>
              </TableCell>
            </>
          ) : (
            getUsersData?.map((item) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.nome}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>
                  {item?.actived ? (
                    <span className="text-sm font-normal text-green-400">
                      Ativo
                    </span>
                  ) : (
                    <span className="text-sm font-normal text-rose-600">
                      Inativo
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-right flex items-center justify-end gap-2">
                    <EditUser dataEditUsers={item} />
                    <DeleteUsers dataUsers={item} />
                    <Switch defaultChecked={item?.actived} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}
