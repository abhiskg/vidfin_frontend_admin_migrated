import { useAddInsightMutation } from "@/api/use-insight-api";
import {
  useAddInsightCategoryMutation,
  useQueryInsightCategory,
  useQueryStockCategory,
} from "@/api/use-insight-category-api";

import { useQuerySubscriptions } from "@/api/use-subscription-api";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormInput } from "@/components/form/form-input";
import { FormInputFile } from "@/components/form/form-input-file";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { Icons } from "@/components/icon";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { insightCategories } from "@/constants/insight-constant";
import { availableLanguages } from "@/constants/language-constant";
import { insightFormSchema, type IInsightForm } from "@/types/insight.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function InsightManagementAddScreen() {
  const { data: subscriptions, isPending: isSubscriptionPending } =
    useQuerySubscriptions();

  const {
    data: availableInsightCategories,
    isPending: isInsightCategoryPending,
  } = useQueryInsightCategory();

  const { data: availableStockCategories, isPending: isStockCategoryPending } =
    useQueryStockCategory();

  const navigate = useNavigate();

  const form = useForm<IInsightForm>({
    resolver: zodResolver(insightFormSchema),
    defaultValues: {
      author_name: "",
      available_for_plans: [],
      insight_desc: "",
      insight_title: "",
      language: "",
      preview_videoid: "",
      slug: "",
      tags: "",
      thumbnail: undefined,
      type: "",
      videoid: "",
      categories: [],
    },
  });
  const { isPending, mutate } = useAddInsightMutation();
  const { mutate: mutateCategory, isPending: isCategoryMutatePending } =
    useAddInsightCategoryMutation();

  const onSubmit = (data: IInsightForm) => {
    const categories = data.categories;
    mutate(data, {
      onSuccess: (res) => {
        if (categories?.length) {
          mutateCategory(
            {
              category_ids: categories.map((category) => parseInt(category)),
              insight_id: res.data.insight.insight_id,
            },
            {
              onSuccess: () => {
                form.reset();
                navigate("/insight-management");
              },
            },
          );
        } else {
          form.reset();
          navigate("/insight-management");
        }
      },
    });
  };

  if (
    isSubscriptionPending ||
    isInsightCategoryPending ||
    isStockCategoryPending
  ) {
    return <PageLoader />;
  }

  return (
    <div className="mt-2">
      <Breadcrumbs
        segments={[
          {
            title: "Dashboard",
            href: "/",
          },
          {
            title: "Insight Management",
            href: `/insight-management`,
          },
          {
            title: "Add Insight",
            href: `/insight-management/add`,
          },
        ]}
      />
      {subscriptions &&
        availableInsightCategories &&
        availableStockCategories && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <FormInput
                      form={form}
                      placeholder="Enter title"
                      label="Title"
                      name="insight_title"
                    />
                    <FormInput
                      form={form}
                      placeholder="Enter author"
                      label="Author"
                      name="author_name"
                    />
                    <FormSelect
                      form={form}
                      label="Category"
                      name="type"
                      options={insightCategories}
                      placeholder="Select category"
                    />
                    <FormInput
                      form={form}
                      placeholder="Enter premium video id"
                      label="Premium Video ID"
                      name="videoid"
                    />
                    <FormInputFile
                      form={form}
                      label="Thumbnail"
                      name="thumbnail"
                    />
                  </div>
                  <div>
                    <FormInput
                      form={form}
                      placeholder="tag1#tag2#tag3"
                      label="Tags"
                      name="tags"
                    />
                    <FormInput
                      form={form}
                      placeholder="Enter Slug"
                      label="Slug"
                      name="slug"
                    />
                    <FormSelect
                      form={form}
                      label="Language"
                      name="language"
                      options={availableLanguages}
                      placeholder="Select Language"
                    />
                    <FormInput
                      form={form}
                      placeholder="Enter preview video id"
                      label="Preview Video ID"
                      name="preview_videoid"
                    />
                  </div>
                </div>
                <FormCheckbox
                  form={form}
                  label="Available for plans"
                  name="available_for_plans"
                  options={subscriptions.map((sub) => ({
                    label: sub.title,
                    value: sub.id.toString(),
                  }))}
                  className="grid grid-cols-6 gap-2"
                />
                {form.watch("type") === "1" && (
                  <FormCheckbox
                    form={form}
                    label="Available categories"
                    name="categories"
                    options={availableInsightCategories.map((category) => ({
                      label: category.title,
                      value: category.id.toString(),
                    }))}
                    className="grid grid-cols-6 gap-2"
                  />
                )}
                {form.watch("type") === "2" && (
                  <FormCheckbox
                    form={form}
                    label="Available categories"
                    name="categories"
                    options={availableStockCategories.map((category) => ({
                      label: category.title,
                      value: category.id.toString(),
                    }))}
                    className="grid grid-cols-6 gap-2"
                  />
                )}
                <FormTextarea
                  form={form}
                  placeholder="Enter description"
                  label="Description"
                  name="insight_desc"
                  className="min-h-[140px]"
                />
              </div>

              {isPending || isCategoryMutatePending ? (
                <Button disabled>
                  <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
                  Loading...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="px-[22px]"
                  disabled={!form.formState.isDirty}
                >
                  Add Insight
                </Button>
              )}
            </form>
          </Form>
        )}
    </div>
  );
}
