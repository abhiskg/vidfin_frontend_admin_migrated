import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { ICourseAnnouncement } from "@/types/course-announcement.type";
import type { ColumnDef } from "@tanstack/react-table";
import { CourseManagementAnnouncementRowActions } from "./course-management-announcement-table-row-action";

export const courseManagementAnnouncementTableColumns: ColumnDef<ICourseAnnouncement>[] =
  [
    {
      id: "si_no",
      header: "SI NO",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "announcement",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Announcement" />
      ),
      enableSorting: true,
    },

    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => <CourseManagementAnnouncementRowActions row={row} />,
    },
  ];
