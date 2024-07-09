import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { statusFilterOptions } from "@/constants/status-constant";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

interface AdminUserManagementTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AdminUserManagementTableToolbar<TData>({
  table,
}: AdminUserManagementTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  // const { data: roles } = useQueryRoles();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter user name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("admin_status") && (
          <DataTableFacetedFilter
            column={table.getColumn("admin_status")}
            title="Status"
            options={statusFilterOptions}
          />
        )}
        {/* {roles && table.getColumn("admin_type") && (
          <DataTableFacetedFilter
            column={table.getColumn("admin_type")}
            title="Admin Type"
            options={roles?.map((role) => ({
              label: role.role_name,
              value: role.role_name,
            }))}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
