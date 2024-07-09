import { useQueryCategory } from "@/api/use-category-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import CategoryManagementTable from "./components/category-management-table";
import { categoryManagementTableColumns } from "./components/category-management-table-column";

const CategoryManagementAddDialog = lazy(() =>
  import("./components/category-management-add-dialog").then((module) => ({
    default: module.CategoryManagementAddDialog,
  })),
);

export default function CategoryManagementScreen() {
  const { isPending, data } = useQueryCategory();
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
              title: "Category Management",
              href: `/category-management`,
            },
          ]}
        />
        {user?.roleDetails.permissions.domain_management?.add === 1 && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add New Category
          </Button>
        )}
      </div>
      {data && data.length > 0 && (
        <CategoryManagementTable
          columns={categoryManagementTableColumns}
          data={data}
        />
      )}
      <CategoryManagementAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
    </div>
  );
}
