import { useQueryCourseAnnouncement } from "@/api/use-course-announcement-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import { useParams } from "react-router-dom";
import CourseManagementAnnouncementTable from "./components/announcement/course-management-announcement-table";
import { courseManagementAnnouncementTableColumns } from "./components/announcement/course-management-announcement-table-column";

const CourseManagementAnnouncementAddDialog = lazy(() =>
  import(
    "./components/announcement/course-management-announcement-add-dialog"
  ).then((module) => ({
    default: module.CourseManagementAnnouncementAddDialog,
  })),
);

export default function CourseManagementAnnouncementScreen() {
  const { id } = useParams();
  const { data: courseAnnouncements, isPending } = useQueryCourseAnnouncement(
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
              title: "Announcement",
              href: `/course-management/${id}/announcement`,
            },
          ]}
        />
        {user?.roleDetails.permissions.course_management?.annoucements ===
          1 && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add Announcement
          </Button>
        )}
      </div>
      {courseAnnouncements && courseAnnouncements.length > 0 && (
        <CourseManagementAnnouncementTable
          columns={courseManagementAnnouncementTableColumns}
          data={courseAnnouncements}
        />
      )}
      <CourseManagementAnnouncementAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        course_id={id || ""}
      />
    </div>
  );
}
