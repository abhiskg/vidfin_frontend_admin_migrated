import { FormInput } from "@/components/form/form-input";
import { FormRichTextEditor } from "@/components/form/form-rich-text-editor";
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
import { subscriptionMonths } from "@/constants/subscription-constant";
import {
  subscriptionFormSchema,
  type ISubscription,
  type ISubscriptionFormType,
} from "@/types/subscription.type";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface SubscriptionManagementViewDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  subscription: ISubscription;
}

export function SubscriptionManagementViewDialog({
  isOpen,
  setIsOpen,
  subscription,
}: SubscriptionManagementViewDialogProps) {
  const form = useForm<ISubscriptionFormType>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      title: subscription.title,
      price: subscription.price,
      duration: subscription.duration,
      duration_type: subscription.duration_type,
      insight_gift: subscription.insight_gift.toString(),
      description: subscription.description,
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>View Subscription</DialogTitle>
          <Form {...form}>
            <form>
              <div className="grid grid-cols-5 gap-x-4 py-3">
                <div className="col-span-2">
                  <FormInput
                    form={form}
                    placeholder="Enter subscription title"
                    label="Title"
                    name="title"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter subscription price"
                    label="Price"
                    name="price"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter subscription duration"
                    label="Duration"
                    name="duration"
                    disabled
                  />
                  <FormSelect
                    form={form}
                    label="Duration Month"
                    name="duration_type"
                    options={subscriptionMonths}
                    placeholder="Select month"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter insight gift"
                    label="Insight gift"
                    name="insight_gift"
                    disabled
                  />
                </div>
                <div className="col-span-3">
                  <FormRichTextEditor
                    form={form}
                    label="Description"
                    name="description"
                    className="min-h-[330px] "
                    disabled
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-[22px]"
                >
                  Close
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
