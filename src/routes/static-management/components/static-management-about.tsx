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

export function StaticManagementAbout() {
  const { isPending, data: staticContent } = useQueryStaticContent("about");

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <>
      {staticContent && (
        <StaticManagementAboutForm staticContent={staticContent} />
      )}
    </>
  );
}

function StaticManagementAboutForm({
  staticContent,
}: {
  staticContent: IStaticContent;
}) {
  const form = useForm<IStaticContentForm>({
    resolver: zodResolver(staticContentFormSchema),
    defaultValues: {
      type: "about",
      content: staticContent.content,
    },
  });

  const { isPending, mutate } = useUpdateStaticContentMutation();

  const onSubmit = (data: IStaticContentForm) => {
    mutate({
      type: data.type,
      content: data.content,
      id: staticContent.id.toString(),
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
              Update About Us
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
