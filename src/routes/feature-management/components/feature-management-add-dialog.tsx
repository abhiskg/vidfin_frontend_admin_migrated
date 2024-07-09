import { useQueryCourses } from "@/api/use-course-api";
import { useAddFeatureMutation } from "@/api/use-feature-api";
import { useQueryInsights } from "@/api/use-insight-api";
import { FormInput } from "@/components/form/form-input";
import { FormMultipleSelect } from "@/components/form/form-multiple-select";
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
import { featureCategories } from "@/constants/feature-constant";
import { featureFormSchema, type IFeatureForm } from "@/types/feature.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function FeatureManagementAddDialog({ isOpen, setIsOpen }: Props) {
  const { data: courses } = useQueryCourses();
  const { data: insights } = useQueryInsights();

  const form = useForm<IFeatureForm>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      category_name: "",
      category_source: "",
      course_ids: [],
      insight_ids: [],
    },
  });
  const { mutate, isPending } = useAddFeatureMutation();

  const onSubmit = (data: IFeatureForm) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        setIsOpen(false);
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Add Feature</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  label="Category Name"
                  name="category_name"
                  placeholder="Enter category name"
                />

                <FormSelect
                  form={form}
                  label="Category Source"
                  name="category_source"
                  options={featureCategories}
                  placeholder="Select device type"
                />

                {form.watch("category_source") === "courses" && courses && (
                  <FormMultipleSelect
                    form={form}
                    label="Courses"
                    name="course_ids"
                    options={courses?.map((course) => ({
                      label: course.course_name,
                      value: course.course_id.toString(),
                    }))}
                    placeholder="Select courses"
                  />
                )}

                {form.watch("category_source") === "insights" && insights && (
                  <FormMultipleSelect
                    form={form}
                    label="Insights"
                    name="insight_ids"
                    options={insights?.map((insight) => ({
                      label: insight.insight_title,
                      value: insight.insight_id.toString(),
                    }))}
                    placeholder="Select insights"
                  />
                )}
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Add Feature
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
