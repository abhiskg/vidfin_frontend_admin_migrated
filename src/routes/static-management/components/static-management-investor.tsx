import {
  useDownloadInvestorComplaints,
  useUpdateInvestorComplaints,
} from "@/api/use-static-api";
import { FormInputFile } from "@/components/form/form-input-file";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { investorFormSchema, type IInvestorForm } from "@/types/static.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function StaticManagementInvestor() {
  const form = useForm<IInvestorForm>({
    resolver: zodResolver(investorFormSchema),
    defaultValues: {
      pdf: undefined,
    },
  });
  const { mutate: investorComplaintsMutate } = useDownloadInvestorComplaints();
  const { mutate, isPending } = useUpdateInvestorComplaints();

  const handleDownloadInvestorComplaints = () => {
    investorComplaintsMutate("hi", {
      onSuccess: (data) => {
        const a = document.createElement("a");
        a.href = data.pdf;
        a.download = "InvestorComplaints.pdf";
        a.target = "_blank";
        a.click();
        a.remove();
      },
    });
  };

  const onSubmit = (data: IInvestorForm) => {
    mutate(data);
  };
  return (
    <div>
      <div className="mb-5">
        <div className="text-lg ">
          Current Investor Complaints:{" "}
          <span
            className="cursor-pointer font-semibold underline"
            onClick={handleDownloadInvestorComplaints}
          >
            File
          </span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormInputFile
            form={form}
            label="Investor Complaints"
            name="pdf"
            className="w-1/2"
            accept=".pdf"
          />
          {!isPending ? (
            <Button
              type="submit"
              className="px-[22px]"
              disabled={!form.formState.isDirty}
            >
              Submit
            </Button>
          ) : (
            <Button disabled>
              <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
              Loading...
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
