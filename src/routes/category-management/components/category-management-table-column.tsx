import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { ICategory } from "@/types/category.type";
import type { ColumnDef } from "@tanstack/react-table";
import { CategoryManagementRowActions } from "./category-management-table-row-action";

export const categoryManagementTableColumns: ColumnDef<ICategory>[] = [
  {
    id: "si_no",
    header: "SI No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "available_for_course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available For Course" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("available_for_course") as boolean;
      return <span>{name === true ? "Yes" : "No"}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "available_for_insight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available For Insight" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("available_for_insight") as boolean;
      return <span>{name === true ? "Yes" : "No"}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "available_for_stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available For Stock" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("available_for_stock") as boolean;
      return <span>{name === true ? "Yes" : "No"}</span>;
    },
    enableSorting: false,
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CategoryManagementRowActions row={row} />,
  },
];
