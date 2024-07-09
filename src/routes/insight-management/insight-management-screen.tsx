import { useQueryInsights } from "@/api/use-insight-api";
import { useAppStore } from "@/app/store";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import InsightManagementTable from "./components/insight-management-table";
import { insightManagementTableColumns } from "./components/insight-management-table-column";

export default function InsightManagementScreen() {
  const { data: insights, isPending } = useQueryInsights();
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
              title: "Insight Management",
              href: `/insight-management`,
            },
          ]}
        />
        {user?.roleDetails.permissions.insight_management?.add === 1 && (
          <Button to="/insight-management/add">Add New Insight</Button>
        )}
      </div>
      {insights && insights.length > 0 && (
        <InsightManagementTable
          columns={insightManagementTableColumns}
          data={insights}
        />
      )}
    </div>
  );
}
