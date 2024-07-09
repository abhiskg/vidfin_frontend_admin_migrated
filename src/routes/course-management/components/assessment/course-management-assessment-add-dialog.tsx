import { useAddCourseAssessmentMutation } from "@/api/use-course-assessment-api";
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
  courseAssessmentFormSchema,
  type ICourseAssessment,
  type ICourseAssessmentForm,
} from "@/types/course-assessment.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  assessment: ICourseAssessment | null | undefined;
  course_id: string;
}

export function CourseManagementAssessmentAddDialog({
  isOpen,
  setIsOpen,
  assessment,
  course_id,
}: Props) {
  const form = useForm<ICourseAssessmentForm>({
    resolver: zodResolver(courseAssessmentFormSchema),
    defaultValues: {
      info: assessment?.info || "",
      passing_criteria: assessment?.passing_criteria || "",
    },
  });
  const { mutate, isPending } = useAddCourseAssessmentMutation(course_id);

  const onSubmit = (data: ICourseAssessmentForm) => {
    mutate(
      {
        course_id: course_id,
        assessment_id: assessment?.assessment_id.toString() || "",
        ...data,
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
          <DialogTitle>Manage Assessment</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  placeholder="Enter info"
                  label="Info"
                  name="info"
                />

                <FormInput
                  form={form}
                  placeholder="Enter passing criteria"
                  label="Passing Criteria"
                  name="passing_criteria"
                />
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    {assessment ? "Update Assessment" : "Add Assessment"}
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
