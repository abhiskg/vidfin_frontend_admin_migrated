import { FormInput } from "@/components/form/form-input";
import { FormMultipleSelect } from "@/components/form/form-multiple-select";
import { FormSelect } from "@/components/form/form-select";
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
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface FeatureManagementViewDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  feature: IFeature;
}

export function FeatureManagementViewDialog({
  isOpen,
  setIsOpen,
  feature,
}: FeatureManagementViewDialogProps) {
  const form = useForm<IFeatureForm>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      category_name: feature.category_name,
      category_source: feature.category_source,
      course_ids:
        feature.courses.length > 0
          ? feature.courses.map((item) => ({
              label: item.course?.course_name,
              value: item.id.toString(),
            }))
          : [],
      insight_ids:
        feature.insights.length > 0
          ? feature.insights.map((item) => ({
              label: item.insights?.insight_title,
              value: item.id.toString(),
            }))
          : [],
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Feature Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form noValidate>
            <div className="py-3">
              <FormInput
                form={form}
                label="Category Name"
                name="category_name"
                placeholder="Enter category name"
                disabled
              />

              <FormSelect
                form={form}
                label="Category Source"
                name="category_source"
                options={featureCategories}
                placeholder="Select device type"
                disabled
              />

              {form.watch("category_source") === "courses" && (
                <FormMultipleSelect
                  form={form}
                  label="Courses"
                  name="course_ids"
                  options={[]}
                  placeholder="Select courses"
                  disabled
                />
              )}

              {form.watch("category_source") === "insights" && (
                <FormMultipleSelect
                  form={form}
                  label="Insights"
                  name="insight_ids"
                  options={[]}
                  placeholder="Select insights"
                  disabled
                />
              )}
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button className="px-[39.5px]" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
