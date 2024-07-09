import {
  useFeaturePriorityMutation,
  useFeatureStatusMutation,
  useQueryFeatures,
} from "@/api/use-feature-api";
import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { featureSchema } from "@/types/feature.type";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const FeatureManagementDeleteDialog = lazy(() =>
  import("./feature-management-delete-dialog").then((module) => ({
    default: module.FeatureManagementDeleteDialog,
  })),
);

const FeatureManagementViewDialog = lazy(() =>
  import("./feature-management-view-dialog").then((module) => ({
    default: module.FeatureManagementViewDialog,
  })),
);

const FeatureManagementEditDialog = lazy(() =>
  import("./feature-management-edit-dialog").then((module) => ({
    default: module.FeatureManagementEditDialog,
  })),
);

interface FeatureManagementRowActionsProps<TData> {
  row: Row<TData>;
}

export function FeatureManagementRowActions<TData>({
  row,
}: FeatureManagementRowActionsProps<TData>) {
  const feature = featureSchema.parse(row.original);
  const user = useAppStore((state) => state.user);
  const { data: features } = useQueryFeatures();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { mutate } = useFeatureStatusMutation();
  const { mutate: mutatePriority } = useFeaturePriorityMutation();

  const featureIndex =
    features?.findIndex((f) => f.category_id === feature.category_id) ?? 0;

  const handleMoveUpPriority = () => {
    const feature = features?.[featureIndex];
    const prevFeature = features?.[featureIndex - 1];

    if (!feature || !prevFeature) return;

    mutatePriority([
      {
        category_id: feature.category_id.toString(),
        priority: prevFeature.priority.toString(),
      },
      {
        category_id: prevFeature.category_id.toString(),
        priority: feature.priority.toString(),
      },
    ]);
  };

  const handleMoveDownPriority = () => {
    const feature = features?.[featureIndex];
    const nextFeature = features?.[featureIndex + 1];

    if (!feature || !nextFeature) return;

    mutatePriority([
      {
        category_id: feature.category_id.toString(),
        priority: nextFeature.priority.toString(),
      },
      {
        category_id: nextFeature.category_id.toString(),
        priority: feature.priority.toString(),
      },
    ]);
  };

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
          {user?.roleDetails.permissions.featured_category_management?.view ===
            1 && (
            <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
              <Icons.eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.featured_category_management
            ?.update === 1 && (
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.featured_category_management
            ?.update === 1 &&
            featureIndex !== 0 && (
              <DropdownMenuItem onClick={handleMoveUpPriority}>
                <Icons.arrowUp className="mr-2 h-4 w-4" />
                Move Up
              </DropdownMenuItem>
            )}
          {user?.roleDetails.permissions.featured_category_management
            ?.update === 1 &&
            featureIndex !== (features?.length ?? 0) - 1 && (
              <DropdownMenuItem onClick={handleMoveDownPriority}>
                <Icons.arrowDown className="mr-2 h-4 w-4" />
                Move Down
              </DropdownMenuItem>
            )}
          {user?.roleDetails.permissions.featured_category_management
            ?.enable === 1 && (
            <DropdownMenuItem
              onClick={() =>
                mutate({
                  id: feature.category_id.toString(),
                  status: feature.status === "1" ? "2" : "1",
                })
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {feature.status === "1" ? "Inactive" : "Active"}
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.featured_category_management
            ?.delete === 1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <FeatureManagementDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        id={feature.category_id}
      />
      <FeatureManagementViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        feature={feature}
      />
      <FeatureManagementEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        feature={feature}
      />
    </>
  );
}
