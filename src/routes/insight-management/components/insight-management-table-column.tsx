import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { IInsight } from "@/types/insight.type";
import type { ColumnDef } from "@tanstack/react-table";
import { InsightManagementRowActions } from "./insight-management-table-row-action";

export const insightManagementTableColumns: ColumnDef<IInsight>[] = [
  {
    id: "si_no",
    header: "SI No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  // {
  //   accessorKey: "thumbnail",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Thumbnail" />
  //   ),
  //   enableSorting: false,
  //   cell: ({ row }) => (
  //     <img
  //       src={row.getValue("thumbnail")}
  //       alt="insight thumbnail"
  //       className="aspect-video w-20 rounded"
  //     />
  //   ),
  // },
  {
    accessorKey: "insight_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    enableSorting: true,
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <span>{row.getValue("type") === "1" ? "Insights" : "Stocks"}</span>
    ),
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
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
    cell: ({ row }) => <InsightManagementRowActions row={row} />,
  },
];
