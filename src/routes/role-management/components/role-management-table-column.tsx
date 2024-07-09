import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { IUserRole } from "@/types/role.type";
import type { ColumnDef } from "@tanstack/react-table";
import { RoleManagementRowActions } from "./role-management-table-row-action";

export const roleManagementTableColumns: ColumnDef<IUserRole>[] = [
  {
    id: "si_no",
    header: "SI No",
    cell: ({ row }) => <div className="min-w-10">{row.index + 1}</div>,
  },
  {
    accessorKey: "role_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role Name" />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "permissions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Permissions" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const permissions = row.getValue(
        "permissions",
      ) as IUserRole["permissions"];
      const viewPermission: string[] = [];
      for (const key in permissions) {
        if (permissions[key as keyof typeof permissions]?.view === 1) {
          viewPermission.push(key);
        }
      }

      return (
        <div className="flex min-w-[42rem] flex-wrap gap-1">
          {viewPermission.map((permission, index) => (
            <span
              key={index}
              className="rounded-md border  bg-card px-1.5 py-1 text-xs font-medium shadow-sm"
            >
              {permission.split("_").join(" ").toLowerCase()}
            </span>
          ))}
        </div>
      );
    },
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
          className={` rounded-full px-2 py-1 text-xs font-medium ${
            row.getValue("status") === "1"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.getValue("status") === "1" ? "Active" : "Inactive"}
        </span>
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RoleManagementRowActions row={row} />,
  },
];
