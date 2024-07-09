import { useAddBannerMutation } from "@/api/use-banner-api";
import { useQueryCourses } from "@/api/use-course-api";
import { useQueryInsights } from "@/api/use-insight-api";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormInputFile } from "@/components/form/form-input-file";
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
  bannerDeviceConstant,
  bannerItemConstant,
  bannerTypeConstant,
} from "@/constants/banner-constant";

import { bannerFormSchema, type IBannerForm } from "@/types/banner.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function BannerManagementAddDialog({ isOpen, setIsOpen }: Props) {
  const { data: courses } = useQueryCourses();
  const { data: insights } = useQueryInsights();

  const form = useForm<IBannerForm>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      item_type: "",
      banner_file: undefined,
      banner_file_mobile: undefined,
      banner_file_type: "image",
      banner_type: "",
      device_type: "",
      end_date: "",
      item_id: "",
      start_date: "",
    },
  });
  const { mutate, isPending } = useAddBannerMutation();

  const onSubmit = (data: IBannerForm) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        setIsOpen(false);
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Add Banner</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-2 gap-x-4 py-3">
                <div>
                  <FormDatePicker
                    form={form}
                    label="Publish Date"
                    name="start_date"
                    placeholder="Pick a date"
                  />

                  {/* <FormSelect
                    form={form}
                    name="banner_file_type"
                    label="Banner File Type"
                    options={bannerFileConstant}
                    placeholder="Select banner file type"
                  /> */}
                  <FormSelect
                    form={form}
                    label="Device Type"
                    name="device_type"
                    options={bannerDeviceConstant}
                    placeholder="Select device type"
                  />
                  <FormInputFile
                    form={form}
                    label="Web Banner File"
                    name="banner_file"
                    accept="image/*"
                    placeholder="Upload banner file"
                  />
                  <FormInputFile
                    form={form}
                    label="Mobile Banner File"
                    name="banner_file_mobile"
                    accept="image/*"
                    placeholder="Upload banner file"
                  />
                </div>
                <div>
                  <FormDatePicker
                    form={form}
                    label="End Date"
                    name="end_date"
                    placeholder="Pick a date"
                  />
                  <FormSelect
                    form={form}
                    label="Banner Type"
                    name="banner_type"
                    options={bannerTypeConstant}
                    placeholder="Select banner type"
                  />
                  {form.watch("banner_type") === "normal" && (
                    <FormSelect
                      form={form}
                      label="Item Type"
                      name="item_type"
                      options={bannerItemConstant}
                      placeholder="Select item type"
                    />
                  )}
                  {form.watch("item_type") === "courses" && courses && (
                    <FormSelect
                      form={form}
                      label="Course Item"
                      name="item_id"
                      options={courses?.map((course) => ({
                        label: course.course_name,
                        value: course.course_id.toString(),
                      }))}
                      placeholder="Select course"
                    />
                  )}
                  {form.watch("item_type") === "insights" && insights && (
                    <FormSelect
                      form={form}
                      label="Insight Item"
                      name="item_id"
                      options={insights?.map((insight) => ({
                        label: insight.insight_title,
                        value: insight.insight_id.toString(),
                      }))}
                      placeholder="Select insight"
                    />
                  )}
                </div>
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Add Banner
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
