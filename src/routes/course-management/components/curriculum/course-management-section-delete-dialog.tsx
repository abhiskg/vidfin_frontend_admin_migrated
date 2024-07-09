import { useDeleteCourseSectionMutation } from "@/api/use-course-curriculum-api";
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

interface CourseManagementSectionDeleteDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  course_id: string;
  section_id: string;
}

export function CourseManagementSectionDeleteDialog({
  isOpen,
  setIsOpen,
  course_id,
  section_id,
}: CourseManagementSectionDeleteDialogProps) {
  const { mutate, isPending } = useDeleteCourseSectionMutation(course_id);
  function handleDelete() {
    mutate(
      {
        course_id: course_id,
        section_id: section_id,
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
          Are you sure you want to delete this section?
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
