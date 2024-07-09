import { useQueryFaq } from "@/api/use-faq-api";
import { PageLoader } from "@/components/loader/page-loader";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import StaticManagementFaqTable from "./static-management-faq-table";
import { staticManagementFaqTableColumns } from "./static-management-faq-table-column";

const StaticManagementFaqAddDialog = lazy(() =>
  import("./static-management-faq-add-dialog").then((module) => ({
    default: module.StaticManagementFaqAddDialog,
  })),
);

export function StaticManagementFaq() {
  const { data, isPending } = useQueryFaq();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (isPending) {
    return <PageLoader />;
  }
  return (
    <div>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setIsAddDialogOpen(true)}>Add New Faq</Button>
      </div>
      {data && data.length > 0 && (
        <StaticManagementFaqTable
          columns={staticManagementFaqTableColumns}
          data={data}
        />
      )}

      <StaticManagementFaqAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
    </div>
  );
}
