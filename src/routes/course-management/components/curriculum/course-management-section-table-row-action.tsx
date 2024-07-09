import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { courseSectionSchema } from "@/types/course-curriculum.type";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const CourseManagementSectionDeleteDialog = lazy(() =>
  import("./course-management-section-delete-dialog").then((module) => ({
    default: module.CourseManagementSectionDeleteDialog,
  })),
);

const CourseManagementSectionViewDialog = lazy(() =>
  import("./course-management-section-view-dialog").then((module) => ({
    default: module.CourseManagementSectionViewDialog,
  })),
);

const CourseManagementSectionEditDialog = lazy(() =>
  import("./course-management-section-edit-dialog").then((module) => ({
    default: module.CourseManagementSectionEditDialog,
  })),
);

const CourseManagementChapterAddDialog = lazy(() =>
  import("./course-management-chapter-add-dialog").then((module) => ({
    default: module.CourseManagementChapterAddDialog,
  })),
);

interface CourseManagementSectionRowActionsProps<TData> {
  row: Row<TData>;
}

export function CourseManagementSectionRowActions<TData>({
  row,
}: CourseManagementSectionRowActionsProps<TData>) {
  const courseSection = courseSectionSchema.parse(row.original);
  const user = useAppStore((state) => state.user);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddChapterDialogOpen, setIsAddChapterDialogOpen] = useState(false);

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
          {/* {user?.roleDetails.permissions.course_management?.curriculum ===
            1 && (
            <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
              <Icons.eye className="mr-2 h-4 w-4" />
              View Section
            </DropdownMenuItem>
          )} */}
          {user?.roleDetails.permissions.course_management?.curriculum ===
            1 && (
            <DropdownMenuItem onClick={() => setIsAddChapterDialogOpen(true)}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Add Chapter
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.course_management?.curriculum ===
            1 && (
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit Section
            </DropdownMenuItem>
          )}

          {user?.roleDetails.permissions.course_management?.curriculum ===
            1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete Section
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CourseManagementSectionDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        course_id={courseSection.course_id.toString()}
        section_id={courseSection.section_id.toString()}
      />
      <CourseManagementSectionViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        section={courseSection}
      />
      <CourseManagementSectionEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        course_id={courseSection.course_id.toString()}
        section_id={courseSection.section_id.toString()}
        section_title={courseSection.section_title}
      />
      <CourseManagementChapterAddDialog
        isOpen={isAddChapterDialogOpen}
        setIsOpen={setIsAddChapterDialogOpen}
        course_id={courseSection.course_id.toString()}
        section_id={courseSection.section_id.toString()}
      />
    </>
  );
}
