import { useAddSubscriptionMutation } from "@/api/use-subscription-api";
import { FormInput } from "@/components/form/form-input";
import { FormRichTextEditor } from "@/components/form/form-rich-text-editor";
import { FormSelect } from "@/components/form/form-select";
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
import { subscriptionMonths } from "@/constants/subscription-constant";
import {
  type ISubscriptionFormType,
  subscriptionFormSchema,
} from "@/types/subscription.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SubscriptionManagementAddDialog({ isOpen, setIsOpen }: Props) {
  const form = useForm<ISubscriptionFormType>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      title: "",
      price: "",
      duration: "",
      duration_type: "",
      insight_gift: "",
      description: "",
    },
  });
  const { mutate, isPending } = useAddSubscriptionMutation();

  const onSubmit = (data: ISubscriptionFormType) => {


    mutate(data, {
      onSuccess: () => {
        form.reset();
        setIsOpen(false);
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Add New Subscription</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-5 gap-x-4 py-3">
                <div className="col-span-2">
                  <FormInput
                    form={form}
                    placeholder="Enter subscription title"
                    label="Title"
                    name="title"
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter subscription price"
                    label="Price"
                    name="price"
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter subscription duration"
                    label="Duration"
                    name="duration"
                  />
                  <FormSelect
                    form={form}
                    label="Duration Month"
                    name="duration_type"
                    options={subscriptionMonths}
                    placeholder="Select month"
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter insight gift"
                    label="Insight gift"
                    name="insight_gift"
                  />
                </div>
                <div className="col-span-3">
                  <FormRichTextEditor
                    form={form}
                    label="Description"
                    name="description"
                    className="min-h-[330px]"
                  />
                </div>
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Add Subscription
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
