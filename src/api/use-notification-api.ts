import { request } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePushNotificationMutation = () => {
  const pushNotification = (payload: {
    title: string;
    message: string;
    notification_type: string;
    course_id?: string;
    insight_id?: string;
    chapter_id?: string;
  }) =>
    request({
      url: `/services/en/v1/admin/pushNotification`,
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: pushNotification,

    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
