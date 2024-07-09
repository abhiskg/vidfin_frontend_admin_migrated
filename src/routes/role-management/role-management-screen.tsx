import { useQueryRoles } from "@/api/use-role-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import RoleManagementTable from "./components/role-management-table";
import { roleManagementTableColumns } from "./components/role-management-table-column";

export default function RoleManagementScreen() {
  const { data, isPending } = useQueryRoles();
  const user = useAppStore((state) => state.user);
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
              title: "Role Management",
              href: `/role-management`,
            },
          ]}
        />
        {user?.roleDetails.permissions.roles_management?.add === 1 && (
          <Button to="/role-management/add">Add New Role</Button>
        )}
      </div>
      {data && data.length > 0 && (
        <RoleManagementTable columns={roleManagementTableColumns} data={data} />
      )}
    </div>
  );
}
