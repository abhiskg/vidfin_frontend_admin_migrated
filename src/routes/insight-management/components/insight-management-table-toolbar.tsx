import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { availableLanguages } from "@/constants/language-constant";
import { subscriptionStatusFilterOptions } from "@/constants/status-constant";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

interface InsightManagementTableToolbarProps<TData> {
  table: Table<TData>;
}

export function InsightManagementTableToolbar<TData>({
  table,
}: InsightManagementTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter insight title..."
          value={
            (table.getColumn("insight_title")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("insight_title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={subscriptionStatusFilterOptions}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={[
              {
                value: "1",
                label: "Insights",
              },
              {
                value: "2",
                label: "Stocks",
              },
            ]}
          />
        )}
        {table.getColumn("language") && (
          <DataTableFacetedFilter
            column={table.getColumn("language")}
            title="Language"
            options={availableLanguages}
          />
        )}
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
