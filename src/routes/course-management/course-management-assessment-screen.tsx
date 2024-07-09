import {
  useQueryCourseAssessment,
  useQueryCourseAssessmentQuestions,
} from "@/api/use-course-assessment-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CourseManagementAssessmentAddDialog } from "./components/assessment/course-management-assessment-add-dialog";
import { CourseManagementAssessmentQuestionAddDialog } from "./components/assessment/course-management-assessment-question-add-dialog";

import CourseManagementAssessmentQuestionTable from "./components/assessment/course-management-assessment-question-table";
import { courseManagementAssessmentQuestionTableColumns } from "./components/assessment/course-management-assessment-question-table-column";

export default function CourseManagementAssessmentScreen() {
  const { id } = useParams();
  const { data: courseAssessment, isPending: isCourseAssessmentPending } =
    useQueryCourseAssessment({ course_id: id || "" });

  const { data: courseAssessmentQuestion, isLoading } =
    useQueryCourseAssessmentQuestions({
      course_id: id || "",
      assesment_id: courseAssessment?.assessment_id.toString() || "",
    });

  const [isAssessmentAddDialogOpen, setIsAssessmentAddDialogOpen] =
    useState(false);
  const [isQuestionAddDialogOpen, setIsQuestionAddDialogOpen] = useState(false);

  const user = useAppStore((state) => state.user);

  if (isLoading || isCourseAssessmentPending) {
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
              title: "Assessment",
              href: `/course-management/${id}/assessment`,
            },
          ]}
        />
        <div className="flex items-center gap-4">
          {user?.roleDetails.permissions.course_management
            ?.course_assessment === 1 && (
            <Button onClick={() => setIsAssessmentAddDialogOpen(true)}>
              {courseAssessment ? "Edit Assessment" : "Add Assessment"}
            </Button>
          )}
          {courseAssessment &&
            user?.roleDetails.permissions.course_management
              ?.course_assessment === 1 && (
              <Button onClick={() => setIsQuestionAddDialogOpen(true)}>
                Add Question
              </Button>
            )}
        </div>
      </div>
      {courseAssessmentQuestion && courseAssessmentQuestion.length > 0 && (
        <CourseManagementAssessmentQuestionTable
          columns={courseManagementAssessmentQuestionTableColumns}
          data={courseAssessmentQuestion}
        />
      )}
      <CourseManagementAssessmentAddDialog
        isOpen={isAssessmentAddDialogOpen}
        setIsOpen={setIsAssessmentAddDialogOpen}
        assessment={courseAssessment}
        course_id={id || ""}
      />
      <CourseManagementAssessmentQuestionAddDialog
        isOpen={isQuestionAddDialogOpen}
        setIsOpen={setIsQuestionAddDialogOpen}
        course_id={id || ""}
        assessment_id={courseAssessment?.assessment_id.toString() || ""}
      />
    </div>
  );
}
