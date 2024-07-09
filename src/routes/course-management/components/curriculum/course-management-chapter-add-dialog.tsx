import { useAddCourseSectionChapterMutation } from "@/api/use-course-curriculum-api";
import { FormInput } from "@/components/form/form-input";
import { FormRadioGroup } from "@/components/form/form-radiogroup";
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
  courseChapterFormSchema,
  type ICourseChapterForm,
} from "@/types/course-curriculum.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  course_id: string;
  section_id: string;
}

export function CourseManagementChapterAddDialog({
  isOpen,
  setIsOpen,
  course_id,
  section_id,
}: Props) {
  const form = useForm<ICourseChapterForm>({
    resolver: zodResolver(courseChapterFormSchema),
    defaultValues: {
      chapter_title: "",
      videoid: "",
      available_non_subscriber: "0",
    },
  });
  const { mutate, isPending } = useAddCourseSectionChapterMutation(course_id);

  const onSubmit = (data: ICourseChapterForm) => {
    mutate(
      {
        section_id,
        ...data,
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
          <DialogTitle>Add Course Chapter</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  placeholder="Enter chapter title"
                  label="Chapter Title"
                  name="chapter_title"
                />

                <FormInput
                  form={form}
                  placeholder="Enter video id"
                  label="Video Id"
                  name="videoid"
                />

                <FormRadioGroup
                  form={form}
                  label="Available for non-subscribers"
                  name="available_non_subscriber"
                  options={
                    [
                      {
                        label: "Yes",
                        value: "1",
                      },
                      {
                        label: "No",
                        value: "0",
                      },
                    ] as const
                  }
                />
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Add Chapter
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
