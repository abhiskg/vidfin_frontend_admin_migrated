/* eslint-disable @typescript-eslint/ban-ts-comment */
import { request } from "@/lib/axios";
import { processTags } from "@/lib/utils";
import type {
  ICourse,
  ICourseEditForm,
  ICourseForm,
} from "@/types/course.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryCourses = () => {
  const fetchCourses = async (): Promise<ICourse[]> => {
    const data = await request({
      url: `/services/en/v1/admin/courseLists`,
      method: "POST",
    });
    return data.data.course;
  };

  return useQuery({
    queryKey: ["course"],
    queryFn: fetchCourses,
  });
};

export const useQueryCourse = (course_id: string) => {
  const fetchCourse = async (): Promise<ICourse> => {
    const data = await request({
      url: `/services/en/v1/admin/courseDetails/${course_id}`,
      method: "GET",
    });
    return data.data.course;
  };

  return useQuery({
    queryKey: ["course", course_id],
    queryFn: fetchCourse,
  });
};

export const useAddCourseMutation = () => {
  const queryClient = useQueryClient();

  const addCourse = (payload: ICourseForm) => {
    if (payload.videoid === "") {
      delete payload.videoid;
    }

    if (payload.similer_courses?.length === 0) {
      delete payload.similer_courses;
    } else {
      // @ts-ignore
      payload.similer_courses = payload.similer_courses
        .map((item) => item.value)
        .join(",");
    }

    if (payload.available_for_plans?.length === 0) {
      delete payload.available_for_plans;
    } else {
      // @ts-ignore
      payload.available_for_plans = payload.available_for_plans.join(",");
    }
    // @ts-ignore
    payload.preview_thumbnail = payload.preview_thumbnail[0];

    if (payload.tags === "") {
      delete payload.tags;
    } else if (payload.tags !== undefined) {
      payload.tags = processTags(payload.tags);
    }

    return request({
      url: `/services/en/v1/admin/addCourse`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
  };

  return useMutation({
    mutationFn: addCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course"],
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

export const useUpdateCourseMutation = () => {
  const queryClient = useQueryClient();

  const updateCourse = (
    payload: ICourseEditForm & {
      course_id: string;
    },
  ) => {
    if (payload.videoid === "") {
      delete payload.videoid;
    }

    if (payload.similer_courses?.length === 0) {
      // @ts-ignore
      payload.similer_courses = ",";
    } else {
      // @ts-ignore
      payload.similer_courses = payload.similer_courses
        .map((item) => item.value)
        .join(",");
    }

    if (payload.available_for_plans?.length === 0) {
      // @ts-ignore
      payload.available_for_plans = ",";
    } else {
      // @ts-ignore
      payload.available_for_plans = payload.available_for_plans.join(",");
    }

    if (!payload.preview_thumbnail) {
      delete payload.preview_thumbnail;
    } else {
      payload.preview_thumbnail = payload.preview_thumbnail[0];
    }

    if (payload.tags === "") {
      delete payload.tags;
    } else if (payload.tags !== undefined) {
      payload.tags = processTags(payload.tags);
    }

    return request({
      url: `/services/en/v1/admin/editCourse`,
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
  };

  return useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course"],
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

export const useCourseStatusMutation = () => {
  const updateStatus = (payload: { id: string; status: string }) =>
    request({
      url: `/services/en/v1/admin/actionCourses?course_id=${payload.id}&status=${payload.status}`,
      method: "GET",
    });

  return useMutation({
    mutationFn: updateStatus,

    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};

export const useCourseCloneMutation = () => {
  const queryClient = useQueryClient();

  const cloneCourse = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/clonecourse/${payload.id}`,
      method: "get",
    });

  return useMutation({
    mutationFn: cloneCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course"],
      });
      toast.success("Course cloned successfully");
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

export const useCourseDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteCourse = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/deleteCourse/${payload.id}`,
      method: "DELETE",
    });

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course"],
      });
      toast.success("Course deleted successfully");
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
