import { useUpdateCourseAssessmentQuestionMutation } from "@/api/use-course-assessment-api";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
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
  courseAssessmentQuestionFormSchema,
  type ICourseAssessmentQuestion,
  type ICourseAssessmentQuestionForm,
} from "@/types/course-assessment.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  assessmentQuestion: ICourseAssessmentQuestion;
}

export function CourseManagementAssessmentQuestionEditDialog({
  isOpen,
  setIsOpen,
  assessmentQuestion,
}: Props) {
  const form = useForm<ICourseAssessmentQuestionForm>({
    resolver: zodResolver(courseAssessmentQuestionFormSchema),
    defaultValues: {
      questions: assessmentQuestion.questions,
      answer_description: assessmentQuestion.answer_description || "",
      options: assessmentQuestion.options,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const { mutate, isPending } = useUpdateCourseAssessmentQuestionMutation(
    assessmentQuestion.course_id.toString(),
  );

  const onSubmit = (data: ICourseAssessmentQuestionForm) => {
    mutate(
      {
        course_id: assessmentQuestion.course_id.toString(),
        assesment_id: assessmentQuestion.assessment_id.toString(),
        question_id: assessmentQuestion.question_id.toString(),
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
          <DialogTitle>Update Question</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  placeholder="Enter question"
                  label="Question"
                  name="questions"
                />
                <FormInput
                  form={form}
                  placeholder="Enter answer description"
                  label="Answer Description"
                  name="answer_description"
                />

                <div className="mb-2 flex items-center justify-between">
                  <h2 className="font-medium">Options</h2>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({
                        option: "",
                        is_correct: "0",
                      })
                    }
                  >
                    Add Option
                  </Button>
                </div>

                <div className="w-full">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex w-full items-center justify-start gap-2"
                    >
                      <div className="grid flex-1 grid-cols-2 gap-2">
                        <FormInput
                          form={form}
                          placeholder={`Enter option ${index + 1}`}
                          name={`options.${index}.option`}
                          className="flex-1"
                        />

                        <FormSelect
                          form={form}
                          name={`options.${index}.is_correct`}
                          placeholder="Select correct option"
                          options={
                            [
                              { label: "Correct", value: "1" },
                              { label: "Incorrect", value: "0" },
                            ] as const
                          }
                        />
                      </div>

                      {fields.length > 2 && (
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          className="-mt-4 bg-red-500 text-white hover:bg-red-600"
                        >
                          <Icons.trash className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Update Question
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
