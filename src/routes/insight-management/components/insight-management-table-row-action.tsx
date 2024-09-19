import {
  useInsightCloneMutation,
  useInsightStatusMutation,
} from "@/api/use-insight-api";
import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { insightSchema } from "@/types/insight.type";
import { useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const InsightManagementDeleteDialog = lazy(() =>
  import("./insight-management-delete-dialog").then((module) => ({
    default: module.InsightManagementDeleteDialog,
  })),
);

const InsightManagementNotificationDialog = lazy(() =>
  import("./insight-management-notification-dialog").then((module) => ({
    default: module.InsightManagementNotificationDialog,
  })),
);

interface InsightManagementRowActionsProps<TData> {
  row: Row<TData>;
}

export function InsightManagementRowActions<TData>({
  row,
}: InsightManagementRowActionsProps<TData>) {
  const insight = insightSchema.parse(row.original);
  const user = useAppStore((state) => state.user);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);

  const { mutate } = useInsightStatusMutation();
  const { mutate: insightCloneMutate } = useInsightCloneMutation();
  const queryClient = useQueryClient();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user?.roleDetails.permissions.insight_management?.view === 1 && (
            <DropdownMenuItem asChild>
              <Link to={`/insight-management/${insight.insight_id}/view`}>
                <Icons.eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.insight_management?.update === 1 && (
            <DropdownMenuItem asChild>
              <Link to={`/insight-management/${insight.insight_id}/edit`}>
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.insight_management?.update === 1 && (
            <DropdownMenuItem
              onClick={() =>
                mutate(
                  {
                    id: insight.insight_id.toString(),
                    status:
                      insight.status === "published"
                        ? "unpublished"
                        : "published",
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["insight"],
                      });
                      toast.success("Insight status updated successfully");
                    },
                  },
                )
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {insight.status === "published" ? "Inactive" : "Active"}
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.insight_management?.update === 1 &&
            insight.status === "unpublished" && (
              <DropdownMenuItem
                onClick={() => setIsNotificationDialogOpen(true)}
              >
                <Icons.settings className="mr-2 h-4 w-4" />
                Active & Push Notification
              </DropdownMenuItem>
            )}
          {user?.roleDetails.permissions.insight_management?.add === 1 && (
            <DropdownMenuItem
              onClick={() =>
                insightCloneMutate({
                  id: insight.insight_id.toString(),
                })
              }
            >
              <Icons.copy className="mr-2 h-4 w-4" />
              Clone Insight
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.insight_management?.delete === 1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <InsightManagementDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        id={insight.insight_id}
      />

      <InsightManagementNotificationDialog
        isOpen={isNotificationDialogOpen}
        setIsOpen={setIsNotificationDialogOpen}
        id={insight.insight_id}
        status={insight.status}
        title={`${insight.insight_title} has been added`}
        message={`Click to see new ${insight.type === "1" ? "insight" : "stock recommendation"} ${insight.insight_title}`}
        insight_id={insight.insight_id.toString()}
        notification_type={insight.insight_type === 1 ? "6" : "19"}
      />
    </>
  );
}
