import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { IFaq } from "@/types/faq.type";
import type { ColumnDef } from "@tanstack/react-table";
import { StaticManagementFaqRowActions } from "./static-management-faq-table-row-action";

export const staticManagementFaqTableColumns: ColumnDef<IFaq>[] = [
  {
    id: "si_no",
    header: "SI No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "question",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Question" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "answer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Answer" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: row.original.answer }}
      />
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <StaticManagementFaqRowActions row={row} />,
  },
];
