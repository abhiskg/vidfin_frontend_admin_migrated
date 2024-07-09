import { request } from "@/lib/axios";
import type {
  ISubscription,
  ISubscriptionFormType,
} from "@/types/subscription.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQuerySubscriptions = () => {
  const fetchSubscriptions = async (): Promise<ISubscription[]> => {
    const data = await request({
      url: `/services/en/v1/admin/list_subscription`,
    });
    return data.data.subscription;
  };

  return useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscriptions,
  });
};

export const useAddSubscriptionMutation = () => {
  const queryClient = useQueryClient();

  const addSubscription = (payload: ISubscriptionFormType) =>
    request({
      url: `/services/en/v1/admin/add_subscription`,
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: addSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription"],
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

export const useUpdateSubscriptionMutation = () => {
  const queryClient = useQueryClient();

  const updateSubscription = (
    payload: ISubscriptionFormType & { id: string },
  ) =>
    request({
      url: `/services/en/v1/admin/edit_subscription`,
      method: "PATCH",
      data: payload,
    });

  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription"],
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

export const useSubscriptionStatusMutation = () => {
  const queryClient = useQueryClient();

  const updateStatus = (payload: { id: string; status: string }) =>
    request({
      url: `/services/en/v1/admin/action_subscription?status=${payload.status}&id=${payload.id}`,
      method: "PATCH",
    });

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription"],
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

export const useSubscriptionDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteSubscription = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/delete_subscription`,
      method: "DELETE",
      //for delete body we pass it using data
      data: payload,
    });

  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription"],
      });
      toast.success("Subscription deleted successfully");
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
