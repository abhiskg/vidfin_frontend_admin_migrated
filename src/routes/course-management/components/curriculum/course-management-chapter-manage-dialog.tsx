import {
  useDeleteCourseSectionChapterMutation,
  useUpdateCourseSectionChapterMutation,
} from "@/api/use-course-curriculum-api";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  courseChapterFormSchema,
  type ICourseChapter,
  type ICourseChapterForm,
} from "@/types/course-curriculum.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  chapter: ICourseChapter;
  course_id: string;
}

export function CourseManagementChapterManageDialog({
  chapter,
  course_id,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ICourseChapterForm>({
    resolver: zodResolver(courseChapterFormSchema),
    defaultValues: {
      chapter_title: chapter.chapter_title,
      videoid: chapter.videoid,
      available_non_subscriber: chapter.available_non_subscriber
        ? chapter.available_non_subscriber.toString()
        : "0",
    },
  });
  const { mutate: mutateUpdateChapter, isPending: isUpdatePending } =
    useUpdateCourseSectionChapterMutation(course_id);

  const { mutate: mutateDeleteChapter, isPending: isDeletePending } =
    useDeleteCourseSectionChapterMutation(course_id);

  const onSubmit = (data: ICourseChapterForm) => {
    mutateUpdateChapter(
      {
        chapter_id: chapter.chapter_id.toString(),
        chapter_title: data.chapter_title,
        videoid: data.videoid,
        available_non_subscriber: data.available_non_subscriber,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="cursor-pointer rounded-md border bg-card px-1.5 py-1 text-xs font-medium shadow-sm transition-colors duration-200 ease-in-out hover:bg-primary hover:text-card">
        {chapter.chapter_title}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Course Chapter</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  label="Chapter Title"
                  name="chapter_title"
                  placeholder="Enter Chapter Title"
                />
                <FormInput
                  form={form}
                  label="Video Id"
                  name="videoid"
                  placeholder="Enter Video Id"
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
                {!isDeletePending ? (
                  <Button
                    type="button"
                    onClick={() =>
                      mutateDeleteChapter(
                        {
                          chapter_id: chapter.chapter_id.toString(),
                        },
                        {
                          onSuccess: () => setIsOpen(false),
                        },
                      )
                    }
                    className="px-[22px]"
                  >
                    Delete Chapter
                  </Button>
                ) : (
                  <Button disabled>
                    <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
                    Loading...
                  </Button>
                )}
                {!isUpdatePending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Update Chapter
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
