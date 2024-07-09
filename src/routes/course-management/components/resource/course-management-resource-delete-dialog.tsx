import { useDeleteCourseResourceMutation } from "@/api/use-course-resource-api";
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

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  course_id: string;
  resource_id: string;
}

export function CourseManagementResourceDeleteDialog({
  isOpen,
  setIsOpen,
  resource_id,
  course_id,
}: Props) {
  const { mutate, isPending } = useDeleteCourseResourceMutation(course_id);
  function handleDelete() {
    mutate(
      {
        resource_id: resource_id,
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
          Are you sure you want to delete this resource?
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
