import { useAppStore } from "@/app/store";
import { useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

interface LogOutDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function LogOutDialog({ isOpen, setIsOpen }: LogOutDialogProps) {
  const updateUser = useAppStore((state) => state.updateUser);
  const [, , removeCookie] = useCookies(["vidfin_refresh"]);
  const queryClient = useQueryClient();

  function handleLogout() {
    setIsOpen(false);
    queryClient.clear();
    removeCookie("vidfin_refresh", {
      path: "/",
    });
    updateUser(null);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to logout from this account?
        </DialogDescription>
        <DialogFooter>
          <Button className="px-[39.5px]" onClick={handleLogout}>
            LogOut
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
