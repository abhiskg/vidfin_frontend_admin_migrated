import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { ICourseSection } from "@/types/course-curriculum.type";
import type { ColumnDef } from "@tanstack/react-table";
import { CourseManagementChapterRowActions } from "./course-management-chapter-table-row-action";
import { CourseManagementSectionRowActions } from "./course-management-section-table-row-action";

export const courseManagementSectionTableColumns: ColumnDef<ICourseSection>[] =
  [
    {
      id: "si_no",
      header: "SI NO",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "section_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "chapters",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Chapters" />
      ),
      enableSorting: false,
      cell: ({ row }) => <CourseManagementChapterRowActions row={row} />,
      // cell: ({ row }) => {
      //   const chapters = row.getValue("chapters") as ICourseSection["chapters"];

      //   return (
      //     <div className="flex min-w-[42rem] flex-wrap gap-1">
      //       {chapters.map((chapter) => (
      //         <span
      //           key={chapter.chapter_id}
      //           className="cursor-pointer rounded-md border bg-card px-1.5 py-1 text-xs font-medium shadow-sm transition-colors duration-200 ease-in-out hover:bg-primary hover:text-card"
      //         >
      //           {chapter.chapter_title}
      //         </span>
      //       ))}
      //     </div>
      //   );
      // },
    },

    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => <CourseManagementSectionRowActions row={row} />,
    },
  ];
