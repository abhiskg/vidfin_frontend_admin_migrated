import { useQueryAdminUsers } from "@/api/use-admin-user-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import AdminUserManagementTable from "./components/admin-user-management-table";
import { adminUserManagementTableColumns } from "./components/admin-user-management-table-column";

const AdminUserManagementAddDialog = lazy(() =>
  import("./components/admin-user-management-add-dialog").then((module) => ({
    default: module.AdminUserManagementAddDialog,
  })),
);

export default function AdminUserManagementScreen() {
  const { data, isPending } = useQueryAdminUsers();
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
              title: "Admin User Management",
              href: `/admin-user-management`,
            },
          ]}
        />
        {user?.roleDetails.permissions.admin_user_management?.add === 1 && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add New Admin
          </Button>
        )}
      </div>
      {data && data.length > 0 && (
        <AdminUserManagementTable
          columns={adminUserManagementTableColumns}
          data={data}
        />
      )}
      <AdminUserManagementAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
    </div>
  );
}
