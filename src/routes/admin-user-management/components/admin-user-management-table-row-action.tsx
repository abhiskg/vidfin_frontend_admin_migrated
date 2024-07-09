import { useAdminUserStatusMutation } from "@/api/use-admin-user-api";
import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminUserSchema } from "@/types/admin-user.type";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const AdminUserManagementDeleteDialog = lazy(() =>
  import("./admin-user-management-delete-dialog").then((module) => ({
    default: module.AdminUserManagementDeleteDialog,
  })),
);

const AdminUserManagementViewDialog = lazy(() =>
  import("./admin-user-management-view-dialog").then((module) => ({
    default: module.AdminUserManagementViewDialog,
  })),
);

const AdminUserManagementEditDialog = lazy(() =>
  import("./admin-user-management-edit-dialog").then((module) => ({
    default: module.AdminUserManagementEditDialog,
  })),
);

interface AdminUserManagementRowActionsProps<TData> {
  row: Row<TData>;
}

export function AdminUserManagementRowActions<TData>({
  row,
}: AdminUserManagementRowActionsProps<TData>) {
  const adminUser = adminUserSchema.parse(row.original);
  const user = useAppStore((state) => state.user);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { mutate } = useAdminUserStatusMutation();

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
          {user?.roleDetails.permissions.admin_user_management?.view === 1 && (
            <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
              <Icons.eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.admin_user_management?.update ===
            1 && (
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.admin_user_management?.enable ===
            1 && (
            <DropdownMenuItem
              onClick={() =>
                mutate({
                  admin_id: adminUser.admin_id.toString(),
                  status: adminUser.admin_status === "1" ? "0" : "1",
                })
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {adminUser.admin_status === "1" ? "Inactive" : "Active"}
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.admin_user_management?.delete ===
            1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminUserManagementDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        admin_id={adminUser.admin_id}
      />
      <AdminUserManagementViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        email={adminUser.email}
        name={adminUser.name}
        role={adminUser.admin_type}
      />
      <AdminUserManagementEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        admin_id={adminUser.admin_id}
        email={adminUser.email}
        name={adminUser.name}
        role_id={adminUser.role_id}
      />
    </>
  );
}
