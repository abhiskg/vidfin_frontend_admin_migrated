import { useCourseDeleteMutation } from "@/api/use-course-api";
import { Icons } from "@/components/icon";
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

interface CourseManagementDeleteDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
}

export function CourseManagementDeleteDialog({
  isOpen,
  setIsOpen,
  id,
}: CourseManagementDeleteDialogProps) {
  const { mutate, isPending } = useCourseDeleteMutation();
  function handleDelete() {
    mutate(
      {
        id: id.toString(),
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this course?
        </DialogDescription>
        <DialogFooter>
          {!isPending ? (
            <Button className="px-[39.5px]" onClick={handleDelete}>
              Delete
            </Button>
          ) : (
            <Button disabled>
              <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
              Loading...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
