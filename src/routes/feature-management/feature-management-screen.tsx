import { useQueryFeatures } from "@/api/use-feature-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import FeatureManagementTable from "./components/feature-management-table";
import { featureManagementTableColumns } from "./components/feature-management-table-column";

const FeatureManagementAddDialog = lazy(() =>
  import("./components/feature-management-add-dialog").then((module) => ({
    default: module.FeatureManagementAddDialog,
  })),
);

export default function FeatureManagementScreen() {
  const { isPending, data } = useQueryFeatures();
  const user = useAppStore((state) => state.user);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Breadcrumbs
          segments={[
            {
              title: "Dashboard",
              href: "/",
            },
            {
              title: "Feature Management",
              href: `/feature-management`,
            },
          ]}
        />
        {user?.roleDetails.permissions.featured_category_management?.add ===
          1 && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add New Feature
          </Button>
        )}
      </div>
      {data && data.length > 0 && (
        <FeatureManagementTable
          columns={featureManagementTableColumns}
          data={data}
        />
      )}
      <FeatureManagementAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
    </div>
  );
}
