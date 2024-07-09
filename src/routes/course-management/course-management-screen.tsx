import { useQueryCourses } from "@/api/use-course-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import CourseManagementTable from "./components/main/course-management-table";
import { courseManagementTableColumns } from "./components/main/course-management-table-column";

export default function CourseManagementScreen() {
  const { data: courses, isPending } = useQueryCourses();
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
          ]}
        />
        {user?.roleDetails.permissions.course_management?.add === 1 && (
          <Button to="/course-management/add">Add New Course</Button>
        )}
      </div>
      {courses && courses.length > 0 && (
        <CourseManagementTable
          columns={courseManagementTableColumns}
          data={courses}
        />
      )}
    </div>
  );
}
