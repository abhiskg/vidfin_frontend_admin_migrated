import { useUpdateCategoryMutation } from "@/api/use-category-api";
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
  categoryFormSchema,
  type ICategory,
  type ICategoryForm,
} from "@/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: ICategory;
}

export function CategoryManagementEditDialog({
  isOpen,
  setIsOpen,
  category,
}: Props) {
  const form = useForm<ICategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: category.title || "",
      available_for_course: category.available_for_course.toString() || "false",
      available_for_insight:
        category.available_for_insight.toString() || "false",
      available_for_stock: category.available_for_stock.toString() || "false",
    },
  });
  const { isPending, mutate } = useUpdateCategoryMutation();

  const onSubmit = (data: ICategoryForm) => {
    mutate(
      {
        ...data,
        id: category.id.toString(),
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
          <DialogTitle>Update Category</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  label="Category Name"
                  name="title"
                  placeholder="Enter category name"
                />

                <FormRadioGroup
                  form={form}
                  label="Available for Course"
                  name="available_for_course"
                  options={
                    [
                      {
                        label: "Yes",
                        value: "true",
                      },
                      {
                        label: "No",
                        value: "false",
                      },
                    ] as const
                  }
                />
                <FormRadioGroup
                  form={form}
                  label="Available for Insight"
                  name="available_for_insight"
                  options={
                    [
                      {
                        label: "Yes",
                        value: "true",
                      },
                      {
                        label: "No",
                        value: "false",
                      },
                    ] as const
                  }
                />
                <FormRadioGroup
                  form={form}
                  label="Available for Stock"
                  name="available_for_stock"
                  options={
                    [
                      {
                        label: "Yes",
                        value: "true",
                      },
                      {
                        label: "No",
                        value: "false",
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
                    Update Category
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
