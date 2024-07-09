import { courseSectionSchema } from "@/types/course-curriculum.type";
import type { Row } from "@tanstack/react-table";
import { lazy } from "react";

const CourseManagementChapterManageDialog = lazy(() =>
  import("./course-management-chapter-manage-dialog").then((module) => ({
    default: module.CourseManagementChapterManageDialog,
  })),
);

interface CourseManagementChapterRowActionsProps<TData> {
  row: Row<TData>;
}

export function CourseManagementChapterRowActions<TData>({
  row,
}: CourseManagementChapterRowActionsProps<TData>) {
  const courseSection = courseSectionSchema.parse(row.original);

  return (
    <>
      <div className="flex min-w-[42rem] flex-wrap gap-1">
        {courseSection.chapters.map((chapter) => {
          return (
            <CourseManagementChapterManageDialog
              course_id={courseSection.course_id.toString()}
              chapter={chapter}
              key={chapter.chapter_id}
            />
          );
        })}
      </div>
    </>
  );
}
