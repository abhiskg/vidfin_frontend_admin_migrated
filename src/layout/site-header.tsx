import { useAppStore } from "@/app/store";
import { pickAvatarName } from "@/lib/utils";
import { Suspense, lazy, useState } from "react";
import { Icons } from "../components/icon";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ThemeToggle } from "../components/ui/theme-toggle";

const LogOutDialog = lazy(() =>
  import("./logout-dialog").then((module) => ({
    default: module.LogOutDialog,
  })),
);
const ProfileDialog = lazy(() =>
  import("./profile-dialog").then((module) => ({
    default: module.ProfileDialog,
  })),
);

export function SiteHeader() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const user = useAppStore((state) => state.user);

  return (
    <div className="flex h-14 w-full items-center justify-end gap-4 border-b pr-10">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className={`relative h-9 w-9 rounded-full `}
          >
            {pickAvatarName(user?.name || "")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <div onClick={() => setIsProfileDialogOpen(true)}>
                <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                Profile
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <div onClick={() => setIsLogoutDialogOpen(true)}>
              <Icons.logOut className="mr-2 h-4 w-4" aria-hidden="true" />
              Log out
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Suspense fallback={null}>
        <LogOutDialog
          isOpen={isLogoutDialogOpen}
          setIsOpen={setIsLogoutDialogOpen}
        />
        <ProfileDialog
          isOpen={isProfileDialogOpen}
          setIsOpen={setIsProfileDialogOpen}
          name={user?.name || ""}
          email={user?.email || ""}
          number={user?.mobile_number || ""}
        />
      </Suspense>
    </div>
  );
}
