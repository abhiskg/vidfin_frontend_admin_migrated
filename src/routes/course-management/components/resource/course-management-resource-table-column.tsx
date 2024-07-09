import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { ICourseResource } from "@/types/course-resource.type";
import type { ColumnDef } from "@tanstack/react-table";
import { CourseManagementResourceRowActions } from "./course-management-resource-table-row-action";

export const courseManagementResourceTableColumns: ColumnDef<ICourseResource>[] =
  [
    {
      id: "si_no",
      header: "SI NO",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "resource_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "section.section_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Section" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "chapter.chapter_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Chapter" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "file_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="File Type" />
      ),
      enableSorting: true,
      cell: ({ row }) => {
        // If the file_type starts with a dot, remove it
        const fileType = row.original.file_type.startsWith(".")
          ? row.original.file_type.slice(1)
          : row.original.file_type;

        return <span>{fileType}</span>;
      },
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => <CourseManagementResourceRowActions row={row} />,
    },
  ];
