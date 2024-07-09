import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Dispatch, SetStateAction } from "react";

interface AdminUserManagementViewDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  email: string;
  role: string;
}

export function AdminUserManagementViewDialog({
  isOpen,
  setIsOpen,
  name,
  email,
  role,
}: AdminUserManagementViewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Admin Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="grid grid-cols-6 text-base text-foreground ">
            <div className="col-span-1 space-y-1 font-semibold ">
              <p>Name:</p>
              <p>Email:</p>
              <p>Role:</p>
            </div>
            <div className="col-span-5 space-y-1">
              <p>{name}</p>
              <p>{email}</p>
              <p>{role}</p>
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
