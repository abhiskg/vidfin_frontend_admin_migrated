import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { courseAnnouncementSchema } from "@/types/course-announcement.type";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const CourseManagementAnnouncementDeleteDialog = lazy(() =>
  import("./course-management-announcement-delete-dialog").then((module) => ({
    default: module.CourseManagementAnnouncementDeleteDialog,
  })),
);

interface CourseManagementAnnouncementRowActionsProps<TData> {
  row: Row<TData>;
}

export function CourseManagementAnnouncementRowActions<TData>({
  row,
}: CourseManagementAnnouncementRowActionsProps<TData>) {
  const courseAnnouncement = courseAnnouncementSchema.parse(row.original);
  const user = useAppStore((state) => state.user);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
          {user?.roleDetails.permissions.course_management?.annoucements ===
            1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CourseManagementAnnouncementDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        id={courseAnnouncement.id}
        course_id={courseAnnouncement.course_id.toString()}
      />
    </>
  );
}
