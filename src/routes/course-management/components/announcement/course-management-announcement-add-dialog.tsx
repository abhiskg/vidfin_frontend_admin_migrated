
import { useAddCourseAnnouncementMutation } from "@/api/use-course-announcement-api";
import { FormTextarea } from "@/components/form/form-textarea";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  courseAnnouncementFormSchema,
  type ICourseAnnouncementForm,
} from "@/types/course-announcement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  course_id: string;
}

export function CourseManagementAnnouncementAddDialog({
  isOpen,
  setIsOpen,
  course_id,
}: Props) {
  const form = useForm<ICourseAnnouncementForm>({
    resolver: zodResolver(courseAnnouncementFormSchema),
    defaultValues: {
      announcement: "",
    },
  });
  const { mutate, isPending } = useAddCourseAnnouncementMutation(course_id);

  const onSubmit = (data: ICourseAnnouncementForm) => {
    // const selectedRole = roles?.find(
    //   (role) => role.role_id === Number(data.role_id),
    // );
    mutate(
      {
        course_id: course_id,
        announcement: data.announcement,
      },
      {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
        },
      },
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Course Announcement</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormTextarea
                  form={form}
                  name="announcement"
                  placeholder="Enter announcement"
                  label="Announcement"
                  className="min-h-40"
                />
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Add Announcement
                  </Button>
                ) : (
                  <Button disabled>
                    <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
                    Loading...
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
