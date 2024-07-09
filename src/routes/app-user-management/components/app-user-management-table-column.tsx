import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { IAppUser } from "@/types/app-user.type";
import type { ColumnDef } from "@tanstack/react-table";

import { formateDate } from "@/lib/utils";
import { AppUserManagementRowActions } from "./app-user-management-table-row-action";

export const appUserManagementTableColumns: ColumnDef<IAppUser>[] = [
  {
    id: "si_no",
    header: "SI No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SignUp Date" />
    ),
    cell: ({ row }) => {
      const date = formateDate(row.getValue("created_at"), {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return <span>{date}</span>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "user_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const name = row.getValue("user_name") as string;
      return name ? (
        <span>{name}</span>
      ) : (
        <span className="text-gray-400">No Name</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return email ? (
        <span>{email}</span>
      ) : (
        <span className="text-gray-400">No Email</span>
      );
    },
  },
  {
    accessorKey: "subscription.subscription.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subscription Type" />
    ),
    enableSorting: true,
    enableHiding: true,
    // cell: ({ row }) => {
    //   const subscription = row.getValue(
    //     "subscription?.subscription?.title",
    //   ) as string;
    // const subscriptionTitle = row.getValue("subscription?.subscription?.title") as string;
    //   return subscription ? (
    //     <span>{subscription}</span>
    //   ) : (
    //     <span className="text-gray-400">No Subscription</span>
    //   );
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
            row.getValue("status") === 1
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.getValue("status") === 1 ? "Active" : "Inactive"}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes((row.getValue(id) as number).toString());
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <AppUserManagementRowActions row={row} />,
  },
];
