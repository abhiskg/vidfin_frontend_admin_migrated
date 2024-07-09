import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { IFeature } from "@/types/feature.type";
import type { ColumnDef } from "@tanstack/react-table";
import { FeatureManagementRowActions } from "./feature-management-table-row-action";

export const featureManagementTableColumns: ColumnDef<IFeature>[] = [
  {
    id: "si_no",
    header: "SI No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "category_source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    // This can be courses or insights, so category_source === "courses" then show courses else show insights

    accessorKey: "courses-insights",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Courses/Insights" />
    ),
    cell: ({ row }) => {
      const feature = row.original;
      const courses = feature.courses.map(
        (course) => course.course?.course_name,
      );
      const insights = feature.insights.map(
        (insight) => insight.insights?.insight_title,
      );
      return (
        <div>
          {feature.category_source === "courses" ? (
            <div className="flex min-w-[42rem] flex-wrap gap-1">
              {courses.map((course) => (
                <span
                  key={course}
                  className="rounded-md border  bg-card px-1.5 py-1 text-xs font-medium shadow-sm"
                >
                  {course}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex min-w-[42rem] flex-wrap gap-1">
              {insights.map((insight) => (
                <span
                  key={insight}
                  className="rounded-md border  bg-card px-1.5 py-1 text-xs font-medium shadow-sm"
                >
                  {insight}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
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
    cell: ({ row }) => <FeatureManagementRowActions row={row} />,
  },
];
