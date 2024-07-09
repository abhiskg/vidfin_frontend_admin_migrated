import { useQueryCourses } from "@/api/use-course-api";
import { useQueryInsights } from "@/api/use-insight-api";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormInputFile } from "@/components/form/form-input-file";
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
import {
  bannerDeviceConstant,
  bannerItemConstant,
  bannerTypeConstant,
} from "@/constants/banner-constant";
import {
  bannerFormSchema,
  type IBanner,
  type IBannerForm,
} from "@/types/banner.type";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface BannerManagementViewDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  banner: IBanner;
}

export function BannerManagementViewDialog({
  isOpen,
  setIsOpen,
  banner,
}: BannerManagementViewDialogProps) {
  const { data: courses } = useQueryCourses();
  const { data: insights } = useQueryInsights();

  const form = useForm<IBannerForm>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      item_type: banner.item_type || "",
      banner_file: undefined,
      banner_file_mobile: undefined,
      banner_file_type: banner.banner_file_type || "",
      banner_type: banner.banner_type || "",
      device_type: banner.device_type || "",
      end_date: banner.end_date ? new Date(banner.end_date) : "",
      item_id: banner.item_id.toString() || "",
      start_date: banner.start_date ? new Date(banner.start_date) : "",
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Banner Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form noValidate>
            <div className="grid grid-cols-2 gap-x-4 py-3">
              <div>
                <FormDatePicker
                  form={form}
                  label="Publish Date"
                  name="start_date"
                  placeholder="Pick a date"
                  disabled
                />

                <FormSelect
                  form={form}
                  label="Device Type"
                  name="device_type"
                  options={bannerDeviceConstant}
                  placeholder="Select device type"
                  disabled
                />

                <FormInputFile
                  form={form}
                  label="Web Banner File"
                  name="banner_file"
                  accept="image/*"
                  placeholder="Upload banner file"
                  disabled
                />
                <FormInputFile
                  form={form}
                  label="Mobile Banner File"
                  name="banner_file_mobile"
                  accept="image/*"
                  placeholder="Upload mobile banner file"
                  disabled
                />
              </div>
              <div>
                <FormDatePicker
                  form={form}
                  label="End Date"
                  name="end_date"
                  placeholder="Pick a date"
                  disabled
                />
                <FormSelect
                  form={form}
                  label="Banner Type"
                  name="banner_type"
                  options={bannerTypeConstant}
                  placeholder="Select banner type"
                  disabled
                />
                {form.watch("banner_type") === "normal" && (
                  <FormSelect
                    form={form}
                    label="Item Type"
                    name="item_type"
                    options={bannerItemConstant}
                    placeholder="Select item type"
                    disabled
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
                    disabled
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
                    disabled
                  />
                )}
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button className="px-[39.5px]" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
