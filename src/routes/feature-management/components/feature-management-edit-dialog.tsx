import { useQueryCourses } from "@/api/use-course-api";
import { useUpdateFeatureMutation } from "@/api/use-feature-api";
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
import {
  featureFormSchema,
  type IFeature,
  type IFeatureForm,
} from "@/types/feature.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  feature: IFeature;
}

export function FeatureManagementEditDialog({
  isOpen,
  setIsOpen,
  feature,
}: Props) {
  const { data: courses } = useQueryCourses();
  const { data: insights } = useQueryInsights();

  const form = useForm<IFeatureForm>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      category_name: feature.category_name,
      category_source: feature.category_source,
      course_ids:
        feature.courses.length > 0
          ? feature.courses.map((item) => ({
              label: item?.course?.course_name,
              value: item.course?.course_id.toString(),
            }))
          : [],
      insight_ids:
        feature.insights.length > 0
          ? feature.insights.map((item) => ({
              label: item.insights?.insight_title,
              value: item.insights?.insight_id.toString(),
            }))
          : [],
    },
  });
  const { isPending, mutate } = useUpdateFeatureMutation();

  const onSubmit = (data: IFeatureForm) => {
    mutate(
      {
        ...data,
        category_id: feature.category_id.toString(),
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
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Update Feature</DialogTitle>
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
                    options={courses
                      ?.filter((course) => course.status === "published")
                      .map((course) => ({
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
                    options={insights
                      ?.filter((insight) => insight.status === "published")
                      .map((insight) => ({
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
                    Update Feature
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
