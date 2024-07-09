import { FormInput } from "@/components/form/form-input";
import { FormRichTextEditor } from "@/components/form/form-rich-text-editor";
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

export function StaticManagementFaqViewDialog({
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Update Faq</DialogTitle>
          <Form {...form}>
            <form noValidate>
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
                <Button
                  className="px-[39.5px]"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
