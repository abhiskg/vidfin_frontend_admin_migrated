import {
  useQueryStaticContent,
  useUpdateStaticContentMutation,
} from "@/api/use-static-api";
import { FormRichTextEditor } from "@/components/form/form-rich-text-editor";
import { Icons } from "@/components/icon";
import { PageLoader } from "@/components/loader/page-loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  staticContentFormSchema,
  type IStaticContent,
  type IStaticContentForm,
} from "@/types/static.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function StaticManagementPrivacy() {
  const { isPending, data: staticContent } = useQueryStaticContent("privacy");

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <>
      {staticContent && (
        <StaticManagementPrivacyForm staticContent={staticContent} />
      )}
    </>
  );
}

function StaticManagementPrivacyForm({
  staticContent,
}: {
  staticContent: IStaticContent;
}) {
  const form = useForm<IStaticContentForm>({
    resolver: zodResolver(staticContentFormSchema),
    defaultValues: {
      type: "privacy",
      content: staticContent.content,
    },
  });

  const { isPending, mutate } = useUpdateStaticContentMutation();

  const onSubmit = (data: IStaticContentForm) => {
    mutate({
      type: data.type,
      content: data.content,
      id: staticContent.id.toString(),
    }, {
      onSuccess: () => {
        toast.success("Privacy Policy updated successfully");
      }
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormRichTextEditor
            form={form}
            name="content"
            className="h-[calc(100vh-17rem)] overflow-y-auto"
          />
          {!isPending ? (
            <Button
              type="submit"
              className="px-[22px]"
              disabled={!form.formState.isDirty}
            >
              Update Privacy Policy
            </Button>
          ) : (
            <Button disabled>
              <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
              Loading...
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
