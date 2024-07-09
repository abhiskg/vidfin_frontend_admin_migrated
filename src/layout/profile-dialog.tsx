import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../components/form/form-input";

interface ProfileDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  email: string;
  number?: string;
}

const formSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  email: z.string().min(1, "Email can't be empty").email("Invalid email"),
  number: z
    .string()
    .min(1, "Number can't be empty")
    .refine((val) => {
      return !isNaN(Number(val)) && val.length === 10;
    }, "Invalid number"),
  oldPassword: z.string().min(1, "Password can't be empty"),
  newPassword: z.string().min(1, "Password can't be empty"),
});

export type ProfileFormType = z.infer<typeof formSchema>;

export function ProfileDialog({
  isOpen,
  setIsOpen,
  name,
  email,
  number,
}: ProfileDialogProps) {
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      email,
      number: number || "",
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (data: ProfileFormType) => {
    console.log(data);
    // mutate(
    //   {

    //   },
    //   {
    //     onSuccess: () => {
    //       setIsOpen(false);
    //     },
    //   },
    // );
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className=" py-3">
                <FormInput
                  form={form}
                  placeholder="Enter your name"
                  label="Name"
                  name="name"
                />
                <FormInput
                  form={form}
                  placeholder="Enter your email"
                  label="Email"
                  name="email"
                />

                <FormInput
                  form={form}
                  placeholder="Enter your number"
                  label="Number"
                  name="number"
                />
                <FormInput
                  form={form}
                  placeholder="Enter your old password"
                  label="Old Password"
                  name="oldPassword"
                />
                <FormInput
                  form={form}
                  placeholder="Enter your new password"
                  label="New Password"
                  name="newPassword"
                />
              </div>
              <DialogFooter>
                {/* {!isPending ? ( */}
                <Button
                  type="submit"
                  className="px-[42px]"
                  disabled={!form.formState.isDirty}
                >
                  Update
                </Button>
                {/* ) : (
                  <Button disabled>
                    <Icons.buttonLoader className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                )} */}
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
