import { useQueryCourseSections } from "@/api/use-course-curriculum-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import { useParams } from "react-router-dom";
import CourseManagementSectionTable from "./components/curriculum/course-management-section-table";
import { courseManagementSectionTableColumns } from "./components/curriculum/course-management-section-table-column";

const CourseManagementSectionAddDialog = lazy(() =>
  import("./components/curriculum/course-management-section-add-dialog").then(
    (module) => ({
      default: module.CourseManagementSectionAddDialog,
    }),
  ),
);

export default function CourseManagementCurriculumScreen() {
  const { id } = useParams();
  const { data, isPending } = useQueryCourseSections(id || "");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const user = useAppStore((state) => state.user);

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Breadcrumbs
          segments={[
            {
              title: "Dashboard",
              href: "/",
            },
            {
              title: "Course Management",
              href: `/course-management`,
            },
            {
              title: "Curriculum",
              href: `/course-management/${id}/curriculum`,
            },
          ]}
        />
        {user?.roleDetails.permissions.admin_user_management?.add === 1 && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add New Section
          </Button>
        )}
      </div>
      {data && data.length > 0 && (
        <CourseManagementSectionTable
          columns={courseManagementSectionTableColumns}
          data={data}
        />
      )}

      <CourseManagementSectionAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        course_id={id || ""}
      />
    </div>
  );
}
