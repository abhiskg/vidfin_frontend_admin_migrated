import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { courseResourceSchema } from "@/types/course-resource.type";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const CourseManagementResourceDeleteDialog = lazy(() =>
  import("./course-management-resource-delete-dialog").then((module) => ({
    default: module.CourseManagementResourceDeleteDialog,
  })),
);

const CourseManagementResourceViewDialog = lazy(() =>
  import("./course-management-resource-view-dialog").then((module) => ({
    default: module.CourseManagementResourceViewDialog,
  })),
);

const CourseManagementResourceEditDialog = lazy(() =>
  import("./course-management-resource-edit-dialog").then((module) => ({
    default: module.CourseManagementResourceEditDialog,
  })),
);

interface CourseManagementResourceRowActionsProps<TData> {
  row: Row<TData>;
}

export function CourseManagementResourceRowActions<TData>({
  row,
}: CourseManagementResourceRowActionsProps<TData>) {

  const courseResource = courseResourceSchema.parse(row.original);
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
          {user?.roleDetails.permissions.admin_user_management?.delete ===
            1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CourseManagementResourceDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        course_id={courseResource.course_id.toString()}
        resource_id={courseResource.resource_id.toString()}
      />
      <CourseManagementResourceViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        resource={courseResource}
      />
      <CourseManagementResourceEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        resource={courseResource}
      />
    </>
  );
}
