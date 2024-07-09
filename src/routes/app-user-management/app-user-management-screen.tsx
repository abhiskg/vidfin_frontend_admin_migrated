import { useQueryAppUsers } from "@/api/use-app-user-api";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import AppUserManagementTable from "./components/app-user-management-table";
import { appUserManagementTableColumns } from "./components/app-user-management-table-column";

export default function AppUserManagementScreen() {
  const { data, isPending } = useQueryAppUsers();

  if (isPending) {
    return <PageLoader />;
  }
  console.log(data);
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
      </div>
      {data && data.user.length > 0 && (
        <AppUserManagementTable
          columns={appUserManagementTableColumns}
          data={data.user}
        />
      )}
    </div>
  );
}
