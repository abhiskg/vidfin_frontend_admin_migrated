import {
  useBannerPriorityMutation,
  useBannerStatusMutation,
  useQueryBanners,
} from "@/api/use-banner-api";
import { useAppStore } from "@/app/store";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bannerSchema } from "@/types/banner.type";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy, useState } from "react";

const BannerManagementDeleteDialog = lazy(() =>
  import("./banner-management-delete-dialog").then((module) => ({
    default: module.BannerManagementDeleteDialog,
  })),
);

const BannerManagementViewDialog = lazy(() =>
  import("./banner-management-view-dialog").then((module) => ({
    default: module.BannerManagementViewDialog,
  })),
);

const BannerManagementEditDialog = lazy(() =>
  import("./banner-management-edit-dialog").then((module) => ({
    default: module.BannerManagementEditDialog,
  })),
);

interface BannerManagementRowActionsProps<TData> {
  row: Row<TData>;
}

export function BannerManagementRowActions<TData>({
  row,
}: BannerManagementRowActionsProps<TData>) {
  const banner = bannerSchema.parse(row.original);
  const user = useAppStore((state) => state.user);
  const { data: banners } = useQueryBanners();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { mutate } = useBannerStatusMutation();
  const { mutate: mutatePriority } = useBannerPriorityMutation();

  const bannerIndex =
    banners?.findIndex((b) => b.banner_id === banner.banner_id) ?? 0;

  const handleMoveUpPriority = () => {
    const banner = banners?.[bannerIndex];
    const prevBanner = banners?.[bannerIndex - 1];

    if (!banner || !prevBanner) {
      return;
    }

    mutatePriority([
      {
        banner_id: banner.banner_id.toString(),
        priority: prevBanner.priority.toString(),
      },
      {
        banner_id: prevBanner.banner_id.toString(),
        priority: banner.priority.toString(),
      },
    ]);
  };

  const handleMoveDownPriority = () => {
    const banner = banners?.[bannerIndex];
    const nextBanner = banners?.[bannerIndex + 1];

    if (!banner || !nextBanner) {
      return;
    }

    mutatePriority([
      {
        banner_id: banner.banner_id.toString(),
        priority: nextBanner.priority.toString(),
      },
      {
        banner_id: nextBanner.banner_id.toString(),
        priority: banner.priority.toString(),
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
          {user?.roleDetails.permissions.banners_management?.view === 1 && (
            <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
              <Icons.eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.banners_management?.update === 1 && (
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.banners_management?.update === 1 &&
            bannerIndex !== 0 && (
              <DropdownMenuItem onClick={handleMoveUpPriority}>
                <Icons.arrowUp className="mr-2 h-4 w-4" />
                Move Up
              </DropdownMenuItem>
            )}
          {user?.roleDetails.permissions.banners_management?.update === 1 &&
            bannerIndex !== (banners?.length ?? 0) - 1 && (
              <DropdownMenuItem onClick={handleMoveDownPriority}>
                <Icons.arrowDown className="mr-2 h-4 w-4" />
                Move Down
              </DropdownMenuItem>
            )}
          {user?.roleDetails.permissions.banners_management?.update === 1 && (
            <DropdownMenuItem
              onClick={() =>
                mutate({
                  id: banner.banner_id.toString(),
                  status: banner.status === "1" ? "0" : "1",
                })
              }
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              {banner.status === "1" ? "Inactive" : "Active"}
            </DropdownMenuItem>
          )}
          {user?.roleDetails.permissions.banners_management?.delete === 1 && (
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <BannerManagementDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        id={banner.banner_id}
      />
      <BannerManagementViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        banner={banner}
        key={banner.banner_id + banner.updated_at}
      />
      <BannerManagementEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        banner={banner}
        key={banner.banner_id + banner.updated_at}
      />
    </>
  );
}
