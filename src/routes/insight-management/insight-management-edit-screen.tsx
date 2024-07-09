import {
  useQueryInsight,
  useUpdateInsightMutation,
} from "@/api/use-insight-api";
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
import {
  insightEditFormSchema,
  type IInsight,
  type IInsightEditForm,
} from "@/types/insight.type";
import type { ISubscription } from "@/types/subscription.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function InsightManagementEditScreen() {
  const { id } = useParams();
  const { data: insight, isPending: isInsightPending } = useQueryInsight(
    id || "",
  );
  const { data: subscriptions, isPending: isSubscriptionPending } =
    useQuerySubscriptions();

  if (isSubscriptionPending || isInsightPending) {
    return <PageLoader />;
  }

  return (
    <>
      {insight && subscriptions && (
        <InsightManagementEditForm
          insight={insight}
          subscriptions={subscriptions}
        />
      )}
    </>
  );
}

interface InsightManagementEditFormProps {
  insight: IInsight;
  subscriptions: ISubscription[];
}

function InsightManagementEditForm({
  insight,
  subscriptions,
}: InsightManagementEditFormProps) {
  const navigate = useNavigate();

  const form = useForm<IInsightEditForm>({
    resolver: zodResolver(insightEditFormSchema),
    defaultValues: {
      author_name: insight?.author_name || "",
      available_for_plans: insight?.available_for_plans || [],
      insight_desc: insight?.insight_desc || "",
      insight_title: insight?.insight_title || "",
      language: insight?.language || "",
      preview_videoid: insight?.preview_videoid || "",
      slug: insight?.slug || "",
      tags: insight?.tags ? insight.tags.join("#") : "",
      thumbnail: undefined,
      type: insight?.type.toString() || "",
      videoid: insight?.videoid || "",
    },
  });

  const { isPending, mutate } = useUpdateInsightMutation();

  const onSubmit = (data: IInsightEditForm) => {
    if (data.slug === insight.slug) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete data.slug;
    }
    if (data.insight_title === insight.insight_title) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete data.insight_title;
    }
    mutate(
      {
        insight_id: insight.insight_id.toString(),
        ...data,
      },
      {
        onSuccess: () => {
          navigate("/insight-management");
        },
      },
    );
  };

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
            title: "Edit Insight",
            href: `/insight-management/${insight.insight_id}/edit`,
          },
        ]}
      />
      {subscriptions && (
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
                  <FormSelect
                    form={form}
                    label="Language"
                    name="language"
                    options={availableLanguages}
                    placeholder="Select Language"
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter Slug"
                    label="Slug"
                    name="slug"
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
                  <h2 className="font-medium">Current Thumbnail</h2>
                  <img
                    src={insight.thumbnail}
                    alt="thumbnail"
                    className="mb-4 aspect-video max-w-[33rem] rounded-md"
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter tags"
                    label="Tags"
                    name="tags"
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
              <FormTextarea
                form={form}
                placeholder="Enter description"
                label="Description"
                name="insight_desc"
                className="min-h-[140px]"
              />
            </div>

            {!isPending ? (
              <Button
                type="submit"
                className="px-[22px]"
                disabled={!form.formState.isDirty}
              >
                Update Insight
              </Button>
            ) : (
              <Button disabled>
                <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
                Loading...
              </Button>
            )}
          </form>
        </Form>
      )}
    </div>
  );
}
