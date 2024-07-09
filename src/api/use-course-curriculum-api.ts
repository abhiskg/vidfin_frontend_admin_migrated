import { request } from "@/lib/axios";
import type { ICourseSection } from "@/types/course-curriculum.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryCourseSections = (course_id: string) => {
  const fetchCourseSections = async (): Promise<ICourseSection[]> => {
    const data = await request({
      url: `/services/en/v1/admin/courseSectionChapters?course_id=${course_id}`,
      method: "GET",
    });
    return data.data.section;
  };

  return useQuery({
    queryKey: ["course-section", course_id],
    queryFn: fetchCourseSections,
  });
};

export const useAddCourseSectionMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const addCourseSection = (payload: {
    course_id: string;
    section_title: string;
  }) =>
    request({
      url: "/services/en/v1/admin/addCourseSection",
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: addCourseSection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-section", cacheId],
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

export const useUpdateCourseSectionMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const updateCourseSection = (payload: {
    course_id: string;
    section_title: string;
    section_id: string;
  }) =>
    request({
      url: "/services/en/v1/admin/editCourseSection",
      method: "PATCH",
      data: payload,
    });

  return useMutation({
    mutationFn: updateCourseSection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-section", cacheId],
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

export const useDeleteCourseSectionMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const deleteCourseSection = (payload: {
    course_id: string;
    section_id: string;
  }) =>
    request({
      url: "/services/en/v1/admin/deleteCourseSection",
      method: "DELETE",
      data: payload,
    });

  return useMutation({
    mutationFn: deleteCourseSection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-section", cacheId],
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

export const useAddCourseSectionChapterMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const addCourseSectionChapter = (payload: {
    section_id: string;
    chapter_title: string;
    available_non_subscriber: string;
    videoid: string;
  }) =>
    request({
      url: "/services/en/v1/admin/addSectionChapter",
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: addCourseSectionChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-section", cacheId],
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

export const useUpdateCourseSectionChapterMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const updateCourseSectionChapter = (payload: {
    chapter_id: string;
    chapter_title: string;
    available_non_subscriber: string;
    videoid: string;
  }) =>
    request({
      url: "/services/en/v1/admin/editSectionChapter",
      method: "PATCH",
      data: payload,
    });

  return useMutation({
    mutationFn: updateCourseSectionChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-section", cacheId],
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

export const useDeleteCourseSectionChapterMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const deleteCourseSectionChapter = (payload: { chapter_id: string }) =>
    request({
      url: "/services/en/v1/admin/deleteSectionChapter",
      method: "DELETE",
      data: payload,
    });

  return useMutation({
    mutationFn: deleteCourseSectionChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-section", cacheId],
      });
      toast.success("Chapter deleted successfully");
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
