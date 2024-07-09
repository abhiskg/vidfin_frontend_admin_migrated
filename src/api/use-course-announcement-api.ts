/* eslint-disable @typescript-eslint/ban-ts-comment */
import { request } from "@/lib/axios";
import type {
  ICourseAnnouncement,
  ICourseAnnouncementForm,
} from "@/types/course-announcement.type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryCourseAnnouncement = (course_id: string) => {
  const fetchCourseAnnouncement = async (): Promise<ICourseAnnouncement[]> => {
    const data = await request({
      url: `/services/en/v1/admin/find_course_annoucement?course_id=${course_id}`,
      method: "GET",
    });
    return data.data.announcement;
  };

  return useQuery({
    queryKey: ["course-announcement", course_id],
    queryFn: fetchCourseAnnouncement,
  });
};

export const useAddCourseAnnouncementMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const addCourseAnnouncement = (
    payload: ICourseAnnouncementForm & {
      course_id: string;
    },
  ) => {
    return request({
      url: "/services/en/v1/admin/add_course_annoucement",
      method: "POST",
      data: payload,
    });
  };

  return useMutation({
    mutationFn: addCourseAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-announcement", cacheId],
      });
    },
    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};

export const useDeleteCourseAnnouncementMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const deleteCourseAnnouncement = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/delete_course_annoucement?id=${payload.id}`,
      method: "DELETE",
      data: payload,
    });

  return useMutation({
    mutationFn: deleteCourseAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-announcement", cacheId],
      });
      toast.success("Course announcement deleted successfully");
    },
    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
