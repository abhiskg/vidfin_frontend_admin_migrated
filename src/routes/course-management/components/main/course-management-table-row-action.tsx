import {
  useCourseCloneMutation,
  useCourseStatusMutation,
} from "@/api/use-course-api";
import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { courseSchema } from "@/types/course.type";
import { useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CourseManagementDeleteDialog = lazy(() =>
  import("./course-management-delete-dialog").then((module) => ({
    default: module.CourseManagementDeleteDialog,
  })),
);

const CourseManagementNotificationDialog = lazy(() =>
  import("./course-management-notification-dialog").then((module) => ({
    default: module.CourseManagementNotificationDialog,
  })),
);

interface CourseManagementRowActionsProps<TData> {
  row: Row<TData>;
}

export function CourseManagementRowActions<TData>({
  row,
}: CourseManagementRowActionsProps<TData>) {
  const course = courseSchema.parse(row.original);
  const user = useAppStore((state) => state.user);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);

  const { mutate } = useCourseStatusMutation();
  const { mutate: courseCloneMutate } = useCourseCloneMutation();

  const queryClient = useQueryClient();

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
          {user?.roleDetails.permissions.course_management?.view === 1 && (
            <DropdownMenuItem asChild>
              <Link to={`/course-management/${course.course_id}/view`}>
                <Icons.eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.course_management?.update === 1 && (
            <DropdownMenuItem asChild>
              <Link to={`/course-management/${course.course_id}/edit`}>
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.course_management?.curriculum ===
            1 && (
            <DropdownMenuItem asChild>
              <Link to={`/course-management/${course.course_id}/curriculum`}>
                <Icons.edit className="mr-2 h-4 w-4" />
                Curriculum
              </Link>
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.course_management?.resources === 1 && (
            <DropdownMenuItem asChild>
              <Link to={`/course-management/${course.course_id}/resource`}>
                <Icons.edit className="mr-2 h-4 w-4" />
                Resource
              </Link>
            </DropdownMenuItem>
          )}

          {user?.roleDetails.permissions.course_management
            ?.course_assessment === 1 && (
            <DropdownMenuItem asChild>
              <Link to={`/course-management/${course.course_id}/assessment`}>
                <Icons.edit className="mr-2 h-4 w-4" />
                Assessment
              </Link>
            </DropdownMenuItem>
          )}

          {user?.roleDetails.permissions.course_management?.annoucements ===
            1 && (
            <DropdownMenuItem asChild>
              <Link to={`/course-management/${course.course_id}/announcement`}>
                <Icons.edit className="mr-2 h-4 w-4" />
                Announcement
              </Link>
            </DropdownMenuItem>
          )}

          {user?.roleDetails.permissions.course_management?.update === 1 && (
            <DropdownMenuItem
              onClick={() =>
                mutate(
                  {
                    id: course.course_id.toString(),
                    status:
                      course.status === "published"
                        ? "unpublished"
                        : "published",
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["course"],
                      });
                      toast.success("Course status updated successfully");
                    },
                  },
                )
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {course.status === "published" ? "Inactive" : "Active"}
            </DropdownMenuItem>
          )}

          {user?.roleDetails.permissions.course_management?.update === 1 &&
            course.status === "unpublished" && (
              <DropdownMenuItem
                onClick={() => setIsNotificationDialogOpen(true)}
              >
                <Icons.settings className="mr-2 h-4 w-4" />
                Active & Push Notification
              </DropdownMenuItem>
            )}
          {user?.roleDetails.permissions.course_management?.add === 1 && (
            <DropdownMenuItem
              onClick={() =>
                courseCloneMutate({
                  id: course.course_id.toString(),
                })
              }
            >
              <Icons.copy className="mr-2 h-4 w-4" />
              Clone Course
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.course_management?.delete === 1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CourseManagementDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        id={course.course_id}
      />
      <CourseManagementNotificationDialog
        isOpen={isNotificationDialogOpen}
        setIsOpen={setIsNotificationDialogOpen}
        id={course.course_id}
        status={course.status}
        title={`${course.course_name} has been added`}
        message={`Click to see new Course ${course.course_name}`}
        course_id={course.course_id.toString()}
        notification_type="18"
      />
    </>
  );
}
