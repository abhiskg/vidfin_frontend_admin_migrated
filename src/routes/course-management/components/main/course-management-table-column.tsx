import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formateDate } from "@/lib/utils";
import type { ICourse } from "@/types/course.type";
import type { ColumnDef } from "@tanstack/react-table";
import { CourseManagementRowActions } from "./course-management-table-row-action";

export const courseManagementTableColumns: ColumnDef<ICourse>[] = [
  {
    id: "si_no",
    header: "SI NO",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  // {
  //   accessorKey: "preview_thumbnail",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Thumbnail" />
  //   ),
  //   enableSorting: false,
  //   cell: ({ row }) => (
  //     <img
  //       src={row.getValue("preview_thumbnail")}
  //       alt="course thumbnail"
  //       className="aspect-video w-20 rounded"
  //     />
  //   ),
  // },
  {
    accessorKey: "course_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Publish Date" />
    ),
    cell: ({ row }) => {
      const date = formateDate(row.getValue("created_at"), {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated Date" />
    ),
    cell: ({ row }) => {
      const date = formateDate(row.getValue("updated_at"), {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "language",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Language" />
    ),
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            row.getValue("status") === "published"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.getValue("status") === "published" ? "Active" : "Inactive"}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => <CourseManagementRowActions row={row} />,
  },
];
