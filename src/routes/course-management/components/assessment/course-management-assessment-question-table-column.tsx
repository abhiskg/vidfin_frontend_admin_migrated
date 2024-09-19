import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { ICourseAssessmentQuestion } from "@/types/course-assessment.type";
import type { ColumnDef } from "@tanstack/react-table";
import { CourseManagementAssessmentQuestionRowActions } from "./course-management-assessment-question-table-row-action";

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
      accessorKey: "options",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Answer" />
      ),
      enableSorting: false,
      cell: ({ row }) => (
        <span>
          {row.original.options.map((option, index) => (
            <div key={index}>{option.is_correct === "1" && option.option}</div>
          ))}
        </span>
      ),
    },

    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <CourseManagementAssessmentQuestionRowActions row={row} />
      ),
    },
  ];
