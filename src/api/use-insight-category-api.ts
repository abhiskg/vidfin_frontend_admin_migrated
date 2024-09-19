import { request } from "@/lib/axios";
import type { ICategory } from "@/types/category.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryInsightCategory = () => {
  const fetchCategory = async (): Promise<ICategory[]> => {
    const data = await request({
      url: `/services/en/v1/user/findinsightcategories`,
    });
    return data.data.Categories;
  };

  return useQuery({
    queryKey: ["insight-category"],
    queryFn: fetchCategory,
  });
};

export const useQueryStockCategory = () => {
  const fetchCategory = async (): Promise<ICategory[]> => {
    const data = await request({
      url: `/services/en/v1/user/findstockcategories`,
    });
    return data.data.Categories;
  };

  return useQuery({
    queryKey: ["stock-category"],
    queryFn: fetchCategory,
  });
};

export const useAddInsightCategoryMutation = () => {
  const addInsightCategory = (payload: {
    category_ids: number[];
    insight_id: number;
  }) =>
    request({
      url: `/services/en/v1/admin/createinsightmap`,
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: addInsightCategory,

    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
