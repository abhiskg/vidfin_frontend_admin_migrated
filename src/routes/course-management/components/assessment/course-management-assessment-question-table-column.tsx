import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";
import { CourseManagementAssessmentQuestionRowActions } from "./course-management-assessment-question-table-row-action";
import type { ICourseAssessmentQuestion } from "@/types/course-assessment.type";

export const courseManagementAssessmentQuestionTableColumns: ColumnDef<ICourseAssessmentQuestion>[] =
  [
    {
      id: "si_no",
      header: "SI NO",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "questions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Question" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "answer_description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Answer" />
      ),
      enableSorting: true,
    },

    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <CourseManagementAssessmentQuestionRowActions row={row} />
      ),
    },
  ];
