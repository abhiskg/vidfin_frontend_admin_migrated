import { request } from "@/lib/axios";
import type { ICategory } from "@/types/category.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryCourseCategory = () => {
  const fetchCategory = async (): Promise<ICategory[]> => {
    const data = await request({
      url: `/services/en/v1/user/findcoursecategories`,
    });
    return data.data.Categories;
  };

  return useQuery({
    queryKey: ["course-category"],
    queryFn: fetchCategory,
  });
};

export const useAddCourseCategoryMutation = () => {
  const addCourseCategory = (payload: {
    category_ids: number[];
    course_id: number;
  }) =>
    request({
      url: `/services/en/v1/admin/createcoursemap`,
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: addCourseCategory,

    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
