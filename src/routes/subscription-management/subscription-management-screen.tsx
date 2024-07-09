import { useQuerySubscriptions } from "@/api/use-subscription-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import SubscriptionManagementTable from "./components/subscription-management-table";
import { subscriptionManagementTableColumns } from "./components/subscription-management-table-column";

const SubscriptionManagementAddDialog = lazy(() =>
  import("./components/subscription-management-add-dialog").then((module) => ({
    default: module.SubscriptionManagementAddDialog,
  })),
);

const SubscriptionManagementFreeTrailDialog = lazy(() =>
  import("./components/subscription-management-free-trail-dialog").then(
    (module) => ({
      default: module.SubscriptionManagementFreeTrailDialog,
    }),
  ),
);

export default function SubscriptionManagementScreen() {
  const { data, isPending } = useQuerySubscriptions();
  const user = useAppStore((state) => state.user);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isFreeTrailDialogOpen, setIsFreeTrailDialogOpen] = useState(false);

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
              title: "Subscription Management",
              href: `/subscription-management`,
            },
          ]}
        />
        <div className="flex items-center gap-3">
          {user?.roleDetails.permissions.admin_user_management?.add === 1 && (
            <Button onClick={() => setIsAddDialogOpen(true)}>
              Add New Plan
            </Button>
          )}
          {user?.roleDetails.permissions.admin_user_management?.add === 1 && (
            <Button onClick={() => setIsFreeTrailDialogOpen(true)}>
              Free Trail
            </Button>
          )}
        </div>
      </div>
      {data && data.length > 0 && (
        <SubscriptionManagementTable
          columns={subscriptionManagementTableColumns}
          data={data}
        />
      )}
      <SubscriptionManagementAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
      <SubscriptionManagementFreeTrailDialog
        isOpen={isFreeTrailDialogOpen}
        setIsOpen={setIsFreeTrailDialogOpen}
      />
    </div>
  );
}
