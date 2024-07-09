import { useAddSubscriptionMutation } from "@/api/use-subscription-api";
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
  subscriptionFreeTrailFormSchema,
  type ISubscriptionFreeTrailForm,
} from "@/types/subscription.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SubscriptionManagementFreeTrailDialog({
  isOpen,
  setIsOpen,
}: Props) {
  const form = useForm<ISubscriptionFreeTrailForm>({
    resolver: zodResolver(subscriptionFreeTrailFormSchema),
    defaultValues: {
      is_status: "",
      value: "",
    },
  });
  const { isPending } = useAddSubscriptionMutation();

  const onSubmit = (data: ISubscriptionFreeTrailForm) => {
    console.log(data);
    // mutate(data, {
    //   onSuccess: () => {
    //     form.reset();
    //     setIsOpen(false);
    //   },
    // });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Free Trail</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className=" py-3">
                <FormRadioGroup
                  form={form}
                  label="Free Trail Status"
                  name="is_status"
                  options={
                    [
                      {
                        label: "Active",
                        value: "1",
                      },
                      {
                        label: "Inactive",
                        value: "0",
                      },
                    ] as const
                  }
                />

                <FormInput
                  form={form}
                  placeholder="Enter duration in days"
                  label="Free Trail Duration"
                  name="value"
                />
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Update
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
