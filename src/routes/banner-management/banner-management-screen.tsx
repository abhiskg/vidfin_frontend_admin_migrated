import { useQueryBanners } from "@/api/use-banner-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import BannerManagementTable from "./components/banner-management-table";
import { bannerManagementTableColumns } from "./components/banner-management-table-column";

const BannerManagementAddDialog = lazy(() =>
  import("./components/banner-management-add-dialog").then((module) => ({
    default: module.BannerManagementAddDialog,
  })),
);

export default function BannerManagementScreen() {
  const { data, isPending } = useQueryBanners();
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
              title: "Banner Management",
              href: `/banner-management`,
            },
          ]}
        />
        {user?.roleDetails.permissions.banners_management?.add === 1 && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add New Banner
          </Button>
        )}
      </div>
      {data && data.length > 0 && (
        <BannerManagementTable
          columns={bannerManagementTableColumns}
          data={data}
        />
      )}
      <BannerManagementAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
    </div>
  );
}
