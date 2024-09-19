import { useUpdateBannerMutation } from "@/api/use-banner-api";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  bannerDeviceConstant,
  bannerItemConstant,
  bannerTypeConstant,
} from "@/constants/banner-constant";
import {
  bannerFormUpdateSchema,
  type IBanner,
  type IBannerUpdateForm,
} from "@/types/banner.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  banner: IBanner;
}

export function BannerManagementEditDialog({
  isOpen,
  setIsOpen,
  banner,
}: Props) {
  const { data: courses } = useQueryCourses();
  const { data: insights } = useQueryInsights();

  const activeInsightOptions = insights
    ?.filter(
      (insight) => insight.status === "published" && insight.type === "1",
    )
    .map((insight) => ({
      label: insight.insight_title,
      value: insight.insight_id.toString(),
    }));

  const activeStockOptions = insights
    ?.filter(
      (insight) => insight.status === "published" && insight.type === "2",
    )
    .map((insight) => ({
      label: insight.insight_title,
      value: insight.insight_id.toString(),
    }));

  const form = useForm<IBannerUpdateForm>({
    resolver: zodResolver(bannerFormUpdateSchema),
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
  const { isPending, mutate } = useUpdateBannerMutation();

  const onSubmit = (data: IBannerUpdateForm) => {
    // if banner.item_type === 'courses' then item_id should be from courses otherwise show toast and return

    if (
      data.item_type === "courses" &&
      !courses?.find((course) => course.course_id === Number(data.item_id))
    ) {
      toast.error("Add course item from courses");
      return;
    }

    if (
      data.item_type === "insights" &&
      !insights?.find((insight) => insight.insight_id === Number(data.item_id))
    ) {
      toast.error("Add insight item from insights");
      return;
    }

    mutate(
      {
        banner_id: banner.banner_id.toString(),
        ...data,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          form.reset({
            item_type: data.item_type || "",
            banner_file: undefined,
            banner_file_mobile: undefined,
            banner_file_type: data.banner_file_type || "",
            banner_type: data.banner_type || "",
            device_type: data.device_type || "",
            end_date: data.end_date,
            item_id: data.item_id.toString() || "",
            start_date: data.start_date,
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Update Banner</DialogTitle>
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
                    disabled={
                      form.watch("device_type") === "mobile" ||
                      form.watch("device_type") === ""
                    }
                  />
                  <FormInputFile
                    form={form}
                    label="Mobile Banner File"
                    name="banner_file_mobile"
                    accept="image/*"
                    placeholder="Upload mobile banner file"
                    disabled={
                      form.watch("device_type") === "web" ||
                      form.watch("device_type") === ""
                    }
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
                      options={courses
                        ?.filter((course) => course.status === "published")
                        .map((course) => ({
                          label: course.course_name,
                          value: course.course_id.toString(),
                        }))}
                      placeholder="Select course"
                    />
                  )}
                  {form.watch("item_type") === "insights" && insights && (
                    <FormField
                      control={form.control}
                      name="item_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Insight Item
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select insight" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {activeInsightOptions?.length &&
                                activeInsightOptions.length > 0 && (
                                  <SelectGroup>
                                    <SelectLabel>Insights</SelectLabel>
                                    {activeInsightOptions.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                )}
                              {activeStockOptions?.length &&
                                activeStockOptions.length > 0 && (
                                  <SelectGroup>
                                    <SelectLabel>Stocks</SelectLabel>
                                    {activeStockOptions.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    // <FormSelect
                    //   form={form}
                    //   label="Insight Item"
                    //   name="item_id"
                    //   options={insights
                    //     ?.filter((insight) => insight.status === "published")
                    //     .map((insight) => ({
                    //       label: insight.insight_title,
                    //       value: insight.insight_id.toString(),
                    //     }))}
                    //   placeholder="Select insight"
                    // />
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
                    Update Banner
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
