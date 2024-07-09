import { request } from "@/lib/axios";
import type {
  ICourseResource,
  ICourseResourceEditForm,
  ICourseResourceForm,
} from "@/types/course-resource.type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryCourseResources = (course_id: string) => {
  const fetchCourseResources = async (): Promise<ICourseResource[]> => {
    const data = await request({
      url: `/services/en/v1/admin/list_course_resource?course_id=${course_id}`,
      method: "GET",
    });
    return data.res;
  };

  return useQuery({
    queryKey: ["course-resource", course_id],
    queryFn: fetchCourseResources,
  });
};

export const useAddCourseResourceMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const addCourseResource = (
    payload: ICourseResourceForm & {
      course_id: string;
    },
  ) =>
    request({
      url: "/services/en/v1/admin/add_course_resource",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        course_id: payload.course_id,
        section_id: payload.section_id,
        chapter_id: payload.chapter_id,
        resource_title: payload.resource_title,
        file: payload.file[0],
      },
    });

  return useMutation({
    mutationFn: addCourseResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-resource", cacheId],
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

export const useUpdateCourseResourceMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const updateCourseResource = (
    payload: ICourseResourceEditForm & {
      course_id: string;
      resource_id: string;
    },
  ) => {
    if (!payload.file) {
      delete payload.file;
    } else {
      payload.file = payload.file[0];
    }
    return request({
      url: "/services/en/v1/admin/edit_course_resource",
      method: "PATCH",
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return useMutation({
    mutationFn: updateCourseResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-resource", cacheId],
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

export const useDeleteCourseResourceMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const deleteCourseResource = (payload: { resource_id: string }) =>
    request({
      url: "/services/en/v1/admin/delete_course_resource",
      method: "DELETE",
      data: payload,
    });

  return useMutation({
    mutationFn: deleteCourseResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-resource", cacheId],
      });
      toast.success("Course resource deleted successfully");
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
