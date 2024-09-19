import { useSetAppVersionMutation } from "@/api/use-app-version-api";
import { FormInput } from "@/components/form/form-input";
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
import { appVersionFormSchema } from "@/schemas/app-version-schema";
import type { IAppVersion, IAppVersionForm } from "@/types/app-version.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  appVersion: IAppVersion;
}

export function AppVersionManagementDialog({
  isOpen,
  setIsOpen,
  appVersion,
}: Props) {
  const form = useForm<IAppVersionForm>({
    resolver: zodResolver(appVersionFormSchema),
    defaultValues: {
      min_version: appVersion?.min_version,
      upgrade_version: appVersion?.upgrade_version,
      min_ios_version: appVersion?.min_ios_version,
      upgrade_ios_version: appVersion?.upgrade_ios_version,
    },
  });
  const { isPending, mutate } = useSetAppVersionMutation();

  const onSubmit = (data: IAppVersionForm) => {
    mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <DialogTitle>App Version Management</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  label="Least Android Version"
                  name="min_version"
                  placeholder="Enter least android version"
                  inputMode="numeric"
                />
                <FormInput
                  form={form}
                  label="Updated Android Version"
                  name="upgrade_version"
                  placeholder="Enter updated android version"
                  inputMode="numeric"
                />

                <FormInput
                  form={form}
                  label="Least iOS Version"
                  name="min_ios_version"
                  placeholder="Enter least iOS version"
                  inputMode="numeric"
                />

                <FormInput
                  form={form}
                  label="Updated iOS Version"
                  name="upgrade_ios_version"
                  placeholder="Enter updated iOS version"
                  inputMode="numeric"
                />
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Update Feature
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
