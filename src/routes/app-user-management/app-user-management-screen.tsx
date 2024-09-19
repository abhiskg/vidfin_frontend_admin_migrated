import { useQueryAppUsers } from "@/api/use-app-user-api";
import { useQueryAppVersion } from "@/api/use-app-version-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import AppUserManagementTable from "./components/app-user-management-table";
import { appUserManagementTableColumns } from "./components/app-user-management-table-column";

const AppVersionManagementDialog = lazy(() =>
  import("./components/app-version-management-dialog").then((module) => ({
    default: module.AppVersionManagementDialog,
  })),
);

export default function AppUserManagementScreen() {
  const { data, isPending } = useQueryAppUsers();
  const [isAppVersionDialogOpen, setIsAppVersionDialogOpen] = useState(false);
  const user = useAppStore((state) => state.user);
  const { data: appVersion, isPending: isAppVersionPending } =
    useQueryAppVersion();

  if (isPending || isAppVersionPending) {
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
              title: "App User Management",
              href: `/app-user-management`,
            },
          ]}
        />
        {user?.roleDetails.permissions.application_user_management?.add ===
          1 && (
          <Button onClick={() => setIsAppVersionDialogOpen(true)}>
            App Version
          </Button>
        )}
      </div>
      {data && data.user.length > 0 && (
        <AppUserManagementTable
          columns={appUserManagementTableColumns}
          data={data.user}
        />
      )}

      {appVersion && (
        <AppVersionManagementDialog
          isOpen={isAppVersionDialogOpen}
          setIsOpen={setIsAppVersionDialogOpen}
          appVersion={appVersion}
        />
      )}
    </div>
  );
}
