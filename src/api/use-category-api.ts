import { request } from "@/lib/axios";
import type { ICategory, ICategoryForm } from "@/types/category.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryCategory = () => {
  const fetchCategory = async (): Promise<ICategory[]> => {
    const data = await request({
      url: `/services/en/v1/admin/get_catgeories`,
    });
    return data.data.Categories;
  };

  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });
};

export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient();

  const addCategory = (payload: ICategoryForm) =>
    request({
      url: `/services/en/v1/admin/add_catgeory`,
      method: "POST",
      data: {
        title: payload.title,
        available_for_course:
          payload.available_for_course === "true" ? true : false,
        available_for_insight:
          payload.available_for_insight === "true" ? true : false,
        available_for_stock:
          payload.available_for_stock === "true" ? true : false,
      },
    });

  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category"],
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

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  const updateCategory = (
    payload: ICategoryForm & {
      id: string;
    },
  ) =>
    request({
      url: `/services/en/v1/admin/update_catgeory/${payload.id}`,
      method: "PATCH",
      data: {
        title: payload.title,
        available_for_course:
          payload.available_for_course === "true" ? true : false,
        available_for_insight:
          payload.available_for_insight === "true" ? true : false,
        available_for_stock:
          payload.available_for_stock === "true" ? true : false,
      },
    });

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category"],
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

export const useCategoryDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteCategory = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/delete_catgeory/${payload.id}`,
      method: "DELETE",
    });

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
      toast.success("Category deleted successfully");
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
