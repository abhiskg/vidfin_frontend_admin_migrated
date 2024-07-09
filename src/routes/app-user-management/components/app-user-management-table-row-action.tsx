import {
  useAppUserFullAccessMutation,
  useAppUserMasterMutation,
  useAppUserStatusMutation,
} from "@/api/use-app-user-api";
import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appUserSchema } from "@/types/app-user.type";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const AppUserManagementDeleteDialog = lazy(() =>
  import("./app-user-management-delete-dialog").then((module) => ({
    default: module.AppUserManagementDeleteDialog,
  })),
);

const AppUserManagementViewDialog = lazy(() =>
  import("./app-user-management-view-dialog").then((module) => ({
    default: module.AppUserManagementViewDialog,
  })),
);

interface AppUserManagementRowActionsProps<TData> {
  row: Row<TData>;
}

export function AppUserManagementRowActions<TData>({
  row,
}: AppUserManagementRowActionsProps<TData>) {
  const appUser = appUserSchema.parse(row.original);
  const user = useAppStore((state) => state.user);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { mutate: mutateStatus } = useAppUserStatusMutation();
  const { mutate: mutateMaster } = useAppUserMasterMutation();
  const { mutate: mutateAccess } = useAppUserFullAccessMutation();

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
          {user?.roleDetails.permissions?.application_user_management?.view ===
            1 && (
            <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
              <Icons.eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          )}

          {user?.roleDetails.permissions?.application_user_management
            ?.enable === 1 && (
            <DropdownMenuItem
              onClick={() =>
                mutateStatus({
                  user_id: appUser.user_id.toString(),
                  status: appUser.status === 1 ? "0" : "1",
                })
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {appUser.status === 1 ? "Inactive" : "Active"}
            </DropdownMenuItem>
          )}

          {user?.roleDetails.permissions?.application_user_management
            ?.enable === 1 && (
            <DropdownMenuItem
              onClick={() =>
                mutateAccess({
                  user_id: appUser.user_id.toString(),
                  access: appUser.full_access === 1 ? "0" : "1",
                })
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {appUser.full_access === 1
                ? "Revoke Full Access"
                : "Give Full Access"}
            </DropdownMenuItem>
          )}

          {user?.roleDetails.permissions?.application_user_management
            ?.enable === 1 && (
            <DropdownMenuItem
              onClick={() =>
                mutateMaster({
                  user_id: appUser.user_id.toString(),
                  is_master: appUser.is_master === 1 ? "0" : "1",
                })
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {appUser.is_master === 1
                ? "Unassign Comment Manager"
                : "Assign Comment Manager"}
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

      <AppUserManagementDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        id={appUser.user_id}
      />
      <AppUserManagementViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        appUser={appUser}
      />
    </>
  );
}
