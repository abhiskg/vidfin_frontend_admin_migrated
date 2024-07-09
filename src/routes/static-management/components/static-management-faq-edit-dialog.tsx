import { useUpdateFaqMutation } from "@/api/use-faq-api";
import { FormInput } from "@/components/form/form-input";
import { FormRichTextEditor } from "@/components/form/form-rich-text-editor";
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
import { faqFormSchema, type IFaq, type IFaqForm } from "@/types/faq.type";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  faq: IFaq;
}

export function StaticManagementFaqEditDialog({
  isOpen,
  setIsOpen,
  faq,
}: Props) {
  const form = useForm<IFaqForm>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question: faq.question,
      answer: faq.answer,
    },
  });
  const { isPending, mutate } = useUpdateFaqMutation();

  const onSubmit = (data: IFaqForm) => {
    mutate(
      {
        ...data,
        id: faq.id.toString(),
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
          <DialogTitle>Update Faq</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  label="Question"
                  name="question"
                  placeholder="Enter question"
                />

                <FormRichTextEditor form={form} label="Answer" name="answer" />
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Update Faq
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
