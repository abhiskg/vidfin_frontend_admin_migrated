import { useQueryCourseResources } from "@/api/use-course-resource-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import { useParams } from "react-router-dom";
import CourseManagementResourceTable from "./components/resource/course-management-resource-table";
import { courseManagementResourceTableColumns } from "./components/resource/course-management-resource-table-column";

const CourseManagementResourceAddDialog = lazy(() =>
  import("./components/resource/course-management-resource-add-dialog").then(
    (module) => ({
      default: module.CourseManagementResourceAddDialog,
    }),
  ),
);

export default function CourseManagementResourceScreen() {
  const { id } = useParams();
  const { data: courseResources, isPending } = useQueryCourseResources(
    id || "",
  );
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
              title: "Resource",
              href: `/course-management/${id}/resource`,
            },
          ]}
        />
        {user?.roleDetails.permissions.course_management?.resources === 1 && (
          <Button onClick={() => setIsAddDialogOpen(true)}>Add Resource</Button>
        )}
      </div>
      {courseResources && courseResources.length > 0 && (
        <CourseManagementResourceTable
          columns={courseManagementResourceTableColumns}
          data={courseResources}
        />
      )}
      <CourseManagementResourceAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        course_id={id || ""}
      />
    </div>
  );
}
