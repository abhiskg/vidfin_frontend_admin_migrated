import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IAppUser } from "@/types/app-user.type";
import type { Dispatch, SetStateAction } from "react";

interface AppUserManagementViewDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  appUser: IAppUser;
}

export function AppUserManagementViewDialog({
  isOpen,
  setIsOpen,
  appUser,
}: AppUserManagementViewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="grid grid-cols-6 text-base text-foreground ">
            <div className="col-span-2 space-y-1 font-semibold ">
              <p>Email:</p>
              <p>Status</p>
              <p>Full Access:</p>
              <p>Comment Manager:</p>
              <p>Mobile:</p>
            </div>
            <div className="col-span-4 space-y-1">
              <p>{appUser.email}</p>
              <p>{appUser.status === 1 ? "Active" : "Inactive"}</p>
              <p>{appUser.full_access ? "Yes" : "No"}</p>
              <p>{appUser.is_master ? "Yes" : "No"}</p>
              <p>{appUser.phone}</p>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button className="px-[39.5px]" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
