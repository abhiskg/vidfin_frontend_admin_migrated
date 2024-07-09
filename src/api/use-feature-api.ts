import { request } from "@/lib/axios";
import type { IFeature, IFeatureForm } from "@/types/feature.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryFeatures = () => {
  const fetchFeatures = async (): Promise<IFeature[]> => {
    const data = await request({
      url: `/services/en/v1/admin/featureCategoryList`,
    });
    return data.data.categories;
  };

  return useQuery({
    queryKey: ["feature"],
    queryFn: fetchFeatures,
  });
};

export const useAddFeatureMutation = () => {
  const queryClient = useQueryClient();

  const addFeature = (payload: IFeatureForm) =>
    request({
      url: `/services/en/v1/admin/addFeatureCategory`,
      method: "POST",
      data: {
        category_name: payload.category_name,
        category_source: payload.category_source,
        course_ids:
          payload.category_source === "courses"
            ? payload.course_ids.map((item) => ({ course_id: item.value }))
            : [],
        insight_ids:
          payload.category_source === "insights"
            ? payload.insight_ids.map((item) => ({ insight_id: item.value }))
            : [],
      },
    });

  return useMutation({
    mutationFn: addFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feature"],
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

export const useUpdateFeatureMutation = () => {
  const queryClient = useQueryClient();

  const updateFeature = (
    payload: IFeatureForm & {
      category_id: string;
    },
  ) =>
    request({
      url: `/services/en/v1/admin/editFeatureCategory`,
      method: "PATCH",
      data: {
        category_id: payload.category_id,
        category_name: payload.category_name,
        category_source: payload.category_source,
        course_ids:
          payload.category_source === "courses"
            ? payload.course_ids.map((item) => ({ course_id: item.value }))
            : [],
        insight_ids:
          payload.category_source === "insights"
            ? payload.insight_ids.map((item) => ({ insight_id: item.value }))
            : [],
      },
    });

  return useMutation({
    mutationFn: updateFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feature"],
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

export const useFeaturePriorityMutation = () => {
  const queryClient = useQueryClient();

  const updatePriority = (
    payload: {
      category_id: string;
      priority: string;
    }[],
  ) =>
    request({
      url: `/services/en/v1/admin/changePriorityFeaturedCategory`,
      method: "PATCH",
      data: {
        prioritylist: payload,
      },
    });

  return useMutation({
    mutationFn: updatePriority,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feature"],
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

export const useFeatureStatusMutation = () => {
  const queryClient = useQueryClient();

  const updateStatus = (payload: { id: string; status: string }) =>
    request({
      url: `/services/en/v1/admin/actionCategory?category_id=${payload.id}&status=${payload.status}`,
      method: "PATCH",
    });

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feature"],
      });
      toast.success("Feature status updated successfully");
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

export const useFeatureDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteFeature = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/deleteCategory?category_id=${payload.id}`,
      method: "DELETE",
    });

  return useMutation({
    mutationFn: deleteFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feature"],
      });
      toast.success("Feature deleted successfully");
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
