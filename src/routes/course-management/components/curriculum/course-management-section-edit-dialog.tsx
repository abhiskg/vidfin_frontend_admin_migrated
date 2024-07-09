import { useUpdateCourseSectionMutation } from "@/api/use-course-curriculum-api";
import { FormInput } from "@/components/form/form-input";
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
  courseSectionFormSchema,
  type ICourseSectionForm,
} from "@/types/course-curriculum.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  course_id: string;
  section_id: string;
  section_title: string;
}

export function CourseManagementSectionEditDialog({
  isOpen,
  setIsOpen,
  course_id,
  section_id,
  section_title,
}: Props) {
  const form = useForm<ICourseSectionForm>({
    resolver: zodResolver(courseSectionFormSchema),
    defaultValues: {
      section_title: section_title,
    },
  });
  const { mutate, isPending } = useUpdateCourseSectionMutation(course_id);

  const onSubmit = (data: ICourseSectionForm) => {
    mutate(
      {
        course_id: course_id,
        section_id: section_id,
        section_title: data.section_title,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Course Section</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  placeholder="Enter section title"
                  label="Section Title"
                  name="section_title"
                />
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Update Section
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
