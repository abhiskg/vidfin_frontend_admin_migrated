/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAppStore } from "@/app/store";
import { sidebarData } from "@/constants/sidebar-constant";
import type { IUserPermissions } from "@/types/role.type";
import { Icons } from "../components/icon";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

interface SideNavProps {
  isSideNavCollapsed: boolean;
}

export function SideNav({ isSideNavCollapsed }: SideNavProps) {
  const user = useAppStore((state) => state.user);

  return (
    <div
      data-collapsed={isSideNavCollapsed}
      className="group fixed left-0 top-0 flex flex-col gap-4 pb-2 data-[collapsed=true]:py-2"
    >
      <TooltipProvider delayDuration={0}>
        <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {isSideNavCollapsed ? (
            <>
              <Icons.logoWithoutText className="h-[42px] w-8" />
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Button
                    to="/"
                    linkType="NavLink"
                    variant="ghost"
                    size="icon"
                    className="z-50 h-9 w-9 [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:dark:bg-muted [&.active]:dark:text-muted-foreground [&.active]:dark:hover:bg-muted [&.active]:dark:hover:text-white"
                  >
                    <Icons.pieChart className="h-4 w-4" />
                    <span className="sr-only">Dashboard</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  Dashboard
                </TooltipContent>
              </Tooltip>
              {sidebarData
                .filter(
                  (item) =>
                    user?.roleDetails?.permissions[
                      item.id as keyof IUserPermissions
                    ]?.view === 1,
                )
                .map((item) => {
                  const Icon = item.icon && Icons[item.icon];
                  return (
                    <Tooltip delayDuration={0} key={item.id}>
                      <TooltipTrigger>
                        <Button
                          to={item.link}
                          linkType="NavLink"
                          variant="ghost"
                          size="icon"
                          className="z-50 h-9 w-9 [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:dark:bg-muted [&.active]:dark:text-muted-foreground [&.active]:dark:hover:bg-muted [&.active]:dark:hover:text-white"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="sr-only">{item.title}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="flex items-center gap-4"
                      >
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
            </>
          ) : (
            <>
              <Icons.logo className="h-[52px] w-36" />
              <Button
                to="/"
                linkType="NavLink"
                variant="ghost"
                className="justify-start px-3 [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:dark:bg-muted [&.active]:dark:text-white [&.active]:dark:hover:bg-muted [&.active]:dark:hover:text-white"
              >
                <Icons.pieChart className=" mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              {sidebarData
                .filter(
                  (item) =>
                    user?.roleDetails?.permissions[
                      item.id as keyof IUserPermissions
                    ]?.view === 1,
                )
                .map((item) => {
                  const Icon = item.icon && Icons[item.icon];
                  return (
                    <Button
                      key={item.id}
                      to={item.link}
                      linkType="NavLink"
                      variant="ghost"
                      className="justify-start px-3 [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:dark:bg-muted [&.active]:dark:text-white [&.active]:dark:hover:bg-muted [&.active]:dark:hover:text-white"
                    >
                      <Icon className=" mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Button>
                  );
                })}
            </>
          )}
        </nav>
      </TooltipProvider>
    </div>
  );
}
