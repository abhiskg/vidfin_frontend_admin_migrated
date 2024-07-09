import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { courseAssessmentQuestionSchema } from "@/types/course-assessment.type";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const CourseManagementAssessmentQuestionDeleteDialog = lazy(() =>
  import("./course-management-assessment-question-delete-dialog").then(
    (module) => ({
      default: module.CourseManagementAssessmentQuestionDeleteDialog,
    }),
  ),
);

const CourseManagementAssessmentQuestionViewDialog = lazy(() =>
  import("./course-management-assessment-question-view-dialog").then(
    (module) => ({
      default: module.CourseManagementAssessmentQuestionViewDialog,
    }),
  ),
);

const CourseManagementAssessmentQuestionEditDialog = lazy(() =>
  import("./course-management-assessment-question-edit-dialog").then(
    (module) => ({
      default: module.CourseManagementAssessmentQuestionEditDialog,
    }),
  ),
);

interface CourseManagementAssessmentQuestionRowActionsProps<TData> {
  row: Row<TData>;
}

export function CourseManagementAssessmentQuestionRowActions<TData>({
  row,
}: CourseManagementAssessmentQuestionRowActionsProps<TData>) {

  const assessmentQuestion = courseAssessmentQuestionSchema.parse(row.original);
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

      <CourseManagementAssessmentQuestionDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        course_id={assessmentQuestion.course_id.toString()}
        question_id={assessmentQuestion.question_id.toString()}
      />
      <CourseManagementAssessmentQuestionViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        assessmentQuestion={assessmentQuestion}
      />
      <CourseManagementAssessmentQuestionEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        assessmentQuestion={assessmentQuestion}
      />
    </>
  );
}
