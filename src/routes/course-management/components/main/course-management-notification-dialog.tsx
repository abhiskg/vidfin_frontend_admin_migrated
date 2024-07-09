import { useCourseStatusMutation } from "@/api/use-course-api";
import { usePushNotificationMutation } from "@/api/use-notification-api";
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
import {
  notificationFormSchema,
  type INotificationForm,
} from "@/types/notification.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CourseManagementNotificationDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  status: string;
  title?: string;
  message?: string;
  notification_type: string;
  course_id: string;
}

export function CourseManagementNotificationDialog({
  isOpen,
  setIsOpen,
  id,
  status,
  title = "",
  message = "",
  notification_type,
  course_id,
}: CourseManagementNotificationDialogProps) {
  const form = useForm<INotificationForm>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      title: title,
      message: message,
    },
  });

  const { mutate: courseStatusMutate, isPending: isCourseStatusPending } =
    useCourseStatusMutation();
  const {
    mutate: pushNotificationMutate,
    isPending: isPushNotificationPending,
  } = usePushNotificationMutation();

  const queryClient = useQueryClient();

  function handleStatusAndNotification(data: INotificationForm) {
    courseStatusMutate(
      {
        id: id.toString(),
        status: status === "published" ? "unpublished" : "published",
      },
      {
        onSuccess: () => {
          pushNotificationMutate(
            {
              title: data.title,
              message: data.message,
              notification_type: notification_type,
              course_id: course_id,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["course"],
                });
                toast.success("Course status updated and notification pushed");
                setIsOpen(false);
              },
            },
          );
        },
      },
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Status Update and Push Notification</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleStatusAndNotification)}
            noValidate
          >
            <div className="py-3">
              <FormInput
                form={form}
                placeholder="Enter title"
                label="Title"
                name="title"
              />

              <FormInput
                form={form}
                placeholder="Enter message"
                label="Message"
                name="message"
              />
            </div>
            <DialogFooter>
              {!isCourseStatusPending || !isPushNotificationPending ? (
                <Button type="submit" className="px-[22px]">
                  Update Status & Notification
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
      </DialogContent>
    </Dialog>
  );
}
