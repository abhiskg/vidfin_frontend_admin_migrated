import { FormInput } from "@/components/form/form-input";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const ForgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Enter your email" })
    .email({ message: "Enter a valid email" }),
});

export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordFormSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  //   const { mutate, isLoading } = useResetPassword();

  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormType) => {
    // mutate(data);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border px-4 py-10 shadow lg:rounded-none lg:border-none lg:p-0 lg:shadow-none">
        <Link to="/login" className="flex items-center hover:underline">
          <Icons.arrowLeft className="mr-2" size={16} />
          <span className="text-muted-foreground text-sm">Go Back</span>
        </Link>
        <h1 className="mb-5 mt-5 text-center text-3xl font-bold leading-tight sm:text-4xl lg:mb-3 lg:text-left">
          Forgot Password?
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground lg:text-left">
          You will receive instruction for resetting your password.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="mt-8 "
          >
            <div className="mb-4 space-y-2">
              <FormInput
                form={form}
                placeholder="john@gmail.com"
                label="Email"
                name="email"
                type="email"
              />
            </div>

            {!isLoading ? (
              <Button type="submit" className="flex w-full gap-2">
                Send <Icons.arrowRight className="ml-2" size={16} />
              </Button>
            ) : (
              <Button disabled className="w-full">
                <Icons.buttonLoader className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
}
