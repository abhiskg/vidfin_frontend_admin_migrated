import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { IBanner } from "@/types/banner.type";
import type { ColumnDef } from "@tanstack/react-table";
import { BannerManagementRowActions } from "./banner-management-table-row-action";

export const bannerManagementTableColumns: ColumnDef<IBanner>[] = [
  {
    id: "si_no",
    header: "SI No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "banner_file",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Web Banner" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const banner = row.getValue("banner_file") as string;

      return banner !== "" ? (
        <img
          src={banner}
          alt="Banner Image"
          className="aspect-video w-20 rounded"
        />
      ) : (
        <span>No Image</span>
      );
    },
  },
  {
    accessorKey: "banner_file_mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile Banner" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const banner = row.getValue("banner_file_mobile") as string;

      return banner !== "" ? (
        <img
          src={banner}
          alt="Banner Image"
          className="aspect-video w-20 rounded"
        />
      ) : (
        <span>No Image</span>
      );
    },
  },
  {
    accessorKey: "device_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Device" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "banner_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    enableSorting: true,
    enableHiding: true,
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
            row.getValue("status") === "1"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.getValue("status") === "1" ? "Active" : "Inactive"}
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
    cell: ({ row }) => <BannerManagementRowActions row={row} />,
  },
];
