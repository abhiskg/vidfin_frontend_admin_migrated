/* eslint-disable @typescript-eslint/ban-ts-comment */
import { request } from "@/lib/axios";
import { processTags } from "@/lib/utils";
import type {
  IInsight,
  IInsightEditForm,
  IInsightForm,
} from "@/types/insight.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryInsights = () => {
  const fetchInsights = async (): Promise<IInsight[]> => {
    const data = await request({
      url: `/services/en/v1/admin/insight_list`,
    });
    return data.data.insight;
  };

  return useQuery({
    queryKey: ["insight"],
    queryFn: fetchInsights,
  });
};

export const useQueryInsight = (id: string) => {
  const fetchInsights = async (): Promise<IInsight> => {
    const data = await request({
      url: `/services/en/v1/admin/insight_details?id=${id}`,
    });
    return data;
  };

  return useQuery({
    queryKey: ["insight", id],
    queryFn: fetchInsights,
  });
};

export const useAddInsightMutation = () => {
  const queryClient = useQueryClient();

  const addInsight = (payload: IInsightForm) => {
    if (payload.preview_videoid === "") {
      delete payload.preview_videoid;
    }
    // @ts-ignore
    payload.thumbnail = payload.thumbnail[0];

    if (payload.available_for_plans?.length === 0) {
      delete payload.available_for_plans;
    } else {
      // @ts-ignore
      payload.available_for_plans = payload.available_for_plans.join(",");
    }

    if (payload.author_name === "") {
      delete payload.author_name;
    }

    if (payload.tags === "") {
      delete payload.tags;
    } else if (payload.tags !== undefined) {
      payload.tags = processTags(payload.tags);
    }

    return request({
      url: `/services/en/v1/admin/add_insight`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
  };

  return useMutation({
    mutationFn: addInsight,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["insight"],
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

export const useUpdateInsightMutation = () => {
  const queryClient = useQueryClient();

  const updateInsight = (
    payload: IInsightEditForm & {
      insight_id: string;
    },
  ) => {
    if (payload.preview_videoid === "") {
      delete payload.preview_videoid;
    }

    if (!payload.thumbnail) {
      delete payload.thumbnail;
    } else {
      payload.thumbnail = payload.thumbnail[0];
    }

    if (payload.available_for_plans?.length === 0) {
      // @ts-ignore
      payload.available_for_plans = ",";
    } else {
      // @ts-ignore
      payload.available_for_plans = payload.available_for_plans.join(",");
    }

    if (payload.author_name === "") {
      delete payload.author_name;
    }

    if (payload.tags === "") {
      delete payload.tags;
    } else if (payload.tags !== undefined) {
      payload.tags = processTags(payload.tags);
    }

    return request({
      url: `/services/en/v1/admin/update_insight`,
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
  };

  return useMutation({
    mutationFn: updateInsight,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["insight"],
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

export const useInsightStatusMutation = () => {


  const updateStatus = (payload: { id: string; status: string }) =>
    request({
      url: `/services/en/v1/admin/action_insight?status=${payload.status}&id=${payload.id}`,
      method: "PATCH",
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

export const useInsightCloneMutation = () => {
  const queryClient = useQueryClient();

  const cloneInsight = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/cloneinsight/${payload.id}`,
      method: "get",
    });

  return useMutation({
    mutationFn: cloneInsight,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["insight"],
      });
      toast.success("Insight cloned successfully");
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

export const useInsightDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteInsight = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/delete_insight?id=${payload.id}`,
      method: "DELETE",
    });

  return useMutation({
    mutationFn: deleteInsight,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["insight"],
      });
      toast.success("Insight deleted successfully");
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
