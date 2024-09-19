import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { convertDaysToYearsOrMonthsOrDays } from "@/lib/utils";
import type { ISubscription } from "@/types/subscription.type";
import type { ColumnDef } from "@tanstack/react-table";
import { SubscriptionManagementRowActions } from "./subscription-management-table-row-action";

export const subscriptionManagementTableColumns: ColumnDef<ISubscription>[] = [
  {
    id: "si_no",
    header: "SI No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plan Name" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "duration_in_days",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <span>
        {convertDaysToYearsOrMonthsOrDays(row.getValue("duration_in_days"))}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "subscriber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subscribers" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <div className="ml-10 flex items-center text-center">
        {row.getValue("subscriber")}
      </div>
    ),
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
    header: "Actions",
    cell: ({ row }) => <SubscriptionManagementRowActions row={row} />,
  },
];
