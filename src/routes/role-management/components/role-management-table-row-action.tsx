import { useRoleStatusMutation } from "@/api/use-role-api";
import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userRoleSchema } from "@/types/role.type";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";

const RoleManagementDeleteDialog = lazy(() =>
  import("./role-management-delete-dialog").then((module) => ({
    default: module.RoleManagementDeleteDialog,
  })),
);

interface RoleManagementRowActionsProps<TData> {
  row: Row<TData>;
}

export function RoleManagementRowActions<TData>({
  row,
}: RoleManagementRowActionsProps<TData>) {
  const userRole = userRoleSchema.parse(row.original);
  const user = useAppStore((state) => state.user);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate } = useRoleStatusMutation();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user?.roleDetails.permissions.roles_management?.view === 1 && (
            <DropdownMenuItem asChild>
              <Link to={`/role-management/${userRole.role_id}/view`}>
                <Icons.eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.roles_management?.update === 1 && (
            <DropdownMenuItem asChild>
              <Link to={`/role-management/${userRole.role_id}/edit`}>
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.roles_management?.enable === 1 && (
            <DropdownMenuItem
              onClick={() =>
                mutate({
                  role_id: userRole.role_id.toString(),
                  status: userRole.status === "1" ? "0" : "1",
                })
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {userRole.status === "1" ? "Inactive" : "Active"}
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.roles_management?.delete === 1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <RoleManagementDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        role_id={userRole.role_id}
      />
    </>
  );
}
