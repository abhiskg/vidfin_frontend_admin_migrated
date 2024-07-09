import { useUpdateAdminUserMutation } from "@/api/use-admin-user-api";
import { useQueryRoles } from "@/api/use-role-api";
import { FormInput } from "@/components/form/form-input";
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
import {
  adminUserEditFormSchema,
  type IAdminUserEditForm,
} from "@/types/admin-user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  name: string;
  email: string;
  role_id: number;
  admin_id: number;
}

export function AdminUserManagementEditDialog({
  isOpen,
  setIsOpen,
  name,
  email,
  role_id,
  admin_id,
}: Props) {
  const { data: roles } = useQueryRoles();

  const form = useForm<IAdminUserEditForm>({
    resolver: zodResolver(adminUserEditFormSchema),
    defaultValues: {
      name,
      email,
      password: "",
      role_id: role_id.toString(),
    },
  });
  const { mutate, isPending } = useUpdateAdminUserMutation();

  const onSubmit = (data: IAdminUserEditForm) => {
    if (data.email === email) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      delete data.email;
    }
    if (data.password === "") {
      delete data.password;
    }
    mutate(
      {
        ...data,
        admin_id: admin_id.toString(),
      },
      {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Admin User</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  placeholder="Enter admin name"
                  label="Name"
                  name="name"
                />
                <FormInput
                  form={form}
                  placeholder="Enter admin email"
                  label="Email"
                  name="email"
                />
                <FormInput
                  form={form}
                  placeholder="Enter admin password"
                  label="Password"
                  name="password"
                />
                {roles && (
                  <FormSelect
                    form={form}
                    label="Role"
                    name="role_id"
                    options={roles?.map((role) => ({
                      label: role.role_name,
                      value: role.role_id.toString(),
                    }))}
                    placeholder="Select role"
                  />
                )}
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Update Admin
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
