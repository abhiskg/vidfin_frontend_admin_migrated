import { useAddCourseAssessmentQuestionMutation } from "@/api/use-course-assessment-api";
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
  type ICourseAssessmentQuestionForm,
} from "@/types/course-assessment.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  course_id: string;
  assessment_id: string;
}

export function CourseManagementAssessmentQuestionAddDialog({
  isOpen,
  setIsOpen,
  course_id,
  assessment_id,
}: Props) {
  const form = useForm<ICourseAssessmentQuestionForm>({
    resolver: zodResolver(courseAssessmentQuestionFormSchema),
    defaultValues: {
      questions: "",
      answer_description: "",
      options: [
        {
          option: "",
          is_correct: "0",
        },
        {
          option: "",
          is_correct: "0",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const { mutate, isPending } =
    useAddCourseAssessmentQuestionMutation(course_id);

  const onSubmit = (data: ICourseAssessmentQuestionForm) => {
    mutate(
      {
        course_id,
        assessment_id: assessment_id,
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
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
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
                    Add Question
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
