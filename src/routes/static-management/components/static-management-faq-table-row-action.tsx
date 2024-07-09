import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { faqSchema } from "@/types/faq.type";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const StaticManagementFaqDeleteDialog = lazy(() =>
  import("./static-management-faq-delete-dialog").then((module) => ({
    default: module.StaticManagementFaqDeleteDialog,
  })),
);

const StaticManagementFaqViewDialog = lazy(() =>
  import("./static-management-faq-view-dialog").then((module) => ({
    default: module.StaticManagementFaqViewDialog,
  })),
);

const StaticManagementFaqEditDialog = lazy(() =>
  import("./static-management-faq-edit-dialog").then((module) => ({
    default: module.StaticManagementFaqEditDialog,
  })),
);

interface StaticManagementFaqRowActionsProps<TData> {
  row: Row<TData>;
}

export function StaticManagementFaqRowActions<TData>({
  row,
}: StaticManagementFaqRowActionsProps<TData>) {
  const faq = faqSchema.parse(row.original);
  const user = useAppStore((state) => state.user);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
          {user?.roleDetails.permissions.featured_category_management?.view ===
            1 && (
            <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
              <Icons.eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.featured_category_management
            ?.update === 1 && (
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}

          {user?.roleDetails.permissions.featured_category_management
            ?.delete === 1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <StaticManagementFaqDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        id={faq.id}
      />
      <StaticManagementFaqViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        faq={faq}
      />
      <StaticManagementFaqEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        faq={faq}
      />
    </>
  );
}
