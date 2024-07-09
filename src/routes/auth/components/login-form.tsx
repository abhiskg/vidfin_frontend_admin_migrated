import { useLoginMutation } from "@/api/use-auth-api";
import { useAppStore } from "@/app/store";
import { FormInput } from "@/components/form/form-input";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Password } from "@/components/ui/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Enter your email" })
    .email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Enter your password" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { mutate, isPending } = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateTo = location?.state?.from?.pathname || "/";

  const updateUser = useAppStore((state) => state.updateUser);

  const [, setCookie] = useCookies(["vidfin_refresh"]);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormType) => {
    mutate(data, {
      onSuccess: (data) => {
        form.reset();
        updateUser({
          admin_id: data.admin_id,
          name: data.name,
          email: data.email,
          access_token: data.access_token,
          admin_status: data.admin_status,
          mobile_number: data.mobile_number,
          roleDetails: data.roleDetails,
        });
        setCookie("vidfin_refresh", data.access_token, {
          path: "/",
        });
        navigate(navigateTo, { replace: true });
      },
    });
  };

  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border px-4 py-10 shadow lg:rounded-none lg:border-none lg:p-0 lg:shadow-none">
        <h1 className=" mb-5 text-center text-3xl font-bold leading-tight sm:text-4xl lg:mb-3 lg:text-left">
          Sign in
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="mt-8 "
          >
            <div className="mb-4">
              <FormInput
                form={form}
                placeholder="john@gmail.com"
                label="Email"
                name="email"
                type="email"
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-base font-medium">
                        Password
                      </FormLabel>
                      <Link
                        to="/forgot-password"
                        className="cursor-pointer text-sm font-medium hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <Password placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!isPending ? (
              <Button type="submit" className="flex w-full gap-2">
                Get started <Icons.arrowRight className="ml-2" size={16} />
              </Button>
            ) : (
              <Button disabled className="w-full">
                <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
                Loading...
              </Button>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
}
