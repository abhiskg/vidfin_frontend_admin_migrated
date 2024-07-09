import { useQueryInsight } from "@/api/use-insight-api";
import { useQuerySubscriptions } from "@/api/use-subscription-api";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Form } from "@/components/ui/form";
import { insightCategories } from "@/constants/insight-constant";
import { availableLanguages } from "@/constants/language-constant";
import {
  insightFormSchema,
  type IInsight,
  type IInsightForm,
} from "@/types/insight.type";
import type { ISubscription } from "@/types/subscription.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function InsightManagementViewScreen() {
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
        <InsightManagementViewForm
          insight={insight}
          subscriptions={subscriptions}
        />
      )}
    </>
  );
}

interface InsightManagementViewFormProps {
  insight: IInsight;
  subscriptions: ISubscription[];
}

function InsightManagementViewForm({
  insight,
  subscriptions,
}: InsightManagementViewFormProps) {
  const form = useForm<IInsightForm>({
    resolver: zodResolver(insightFormSchema),
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
            title: "View Insight",
            href: `/insight-management/${insight.insight_id}/view`,
          },
        ]}
      />
      {subscriptions && (
        <Form {...form}>
          <form noValidate>
            <div className="py-3">
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <FormInput
                    form={form}
                    placeholder="Enter title"
                    label="Title"
                    name="insight_title"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter author"
                    label="Author"
                    name="author_name"
                    disabled
                  />
                  <FormSelect
                    form={form}
                    label="Category"
                    name="type"
                    options={insightCategories}
                    placeholder="Select category"
                    disabled
                  />
                  <FormSelect
                    form={form}
                    label="Language"
                    name="language"
                    options={availableLanguages}
                    placeholder="Select Language"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter Slug"
                    label="Slug"
                    name="slug"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter premium video id"
                    label="Premium Video ID"
                    name="videoid"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter preview video id"
                    label="Preview Video ID"
                    name="preview_videoid"
                    disabled
                  />
                </div>
                <div>
                  <h2 className="font-medium">Thumbnail</h2>
                  <img
                    src={insight.thumbnail}
                    alt="thumbnail"
                    className="mb-3 aspect-video max-h-[24rem] rounded-md"
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter tags"
                    label="Tags"
                    name="tags"
                    disabled
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
                disabled
              />
              <FormTextarea
                form={form}
                placeholder="Enter description"
                label="Description"
                name="insight_desc"
                className="min-h-[140px]"
                disabled
              />
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
