import { useSubscriptionStatusMutation } from "@/api/use-subscription-api";
import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { subscriptionSchema } from "@/types/subscription.type";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const SubscriptionManagementDeleteDialog = lazy(() =>
  import("./subscription-management-delete-dialog").then((module) => ({
    default: module.SubscriptionManagementDeleteDialog,
  })),
);

const SubscriptionManagementViewDialog = lazy(() =>
  import("./subscription-management-view-dialog").then((module) => ({
    default: module.SubscriptionManagementViewDialog,
  })),
);

const SubscriptionManagementEditDialog = lazy(() =>
  import("./subscription-management-edit-dialog").then((module) => ({
    default: module.SubscriptionManagementEditDialog,
  })),
);

interface SubscriptionManagementRowActionsProps<TData> {
  row: Row<TData>;
}

export function SubscriptionManagementRowActions<TData>({
  row,
}: SubscriptionManagementRowActionsProps<TData>) {
  const subscription = subscriptionSchema.parse(row.original);
  const user = useAppStore((state) => state.user);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { mutate } = useSubscriptionStatusMutation();

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
          {user?.roleDetails.permissions.subscription_management?.view ===
            1 && (
            <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
              <Icons.eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.subscription_management?.update ===
            1 && (
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.subscription_management?.punlish ===
            1 && (
            <DropdownMenuItem
              onClick={() =>
                mutate({
                  id: subscription.id.toString(),
                  status:
                    subscription.status === "published"
                      ? "unpublished"
                      : "published",
                })
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {subscription.status === "published" ? "Inactive" : "Active"}
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.subscription_management?.delete ===
            1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <SubscriptionManagementDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        id={subscription.id}
      />
      <SubscriptionManagementViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        subscription={subscription}
      />
      <SubscriptionManagementEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        subscription={subscription}
      />
    </>
  );
}
