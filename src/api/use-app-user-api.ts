import { request } from "@/lib/axios";
import type { IAppUser } from "@/types/app-user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryAppUsers = () => {
  const fetchAppUsers = async (): Promise<{
    user: IAppUser[];
    currentPage: string;
    totalPages: number;
    totalItems: number;
  }> => {
    const data = await request({
      url: `/services/en/v1/admin/userLists?page=1`,
    });

    return data.res.data;
  };

  return useQuery({
    queryKey: ["app-user"],
    queryFn: fetchAppUsers,
  });
};

export const useAppUserStatusMutation = () => {
  const queryClient = useQueryClient();

  const updateStatus = (payload: { user_id: string; status: string }) =>
    request({
      url: `/services/en/v1/admin/blockUnblockUser?user_id=${payload.user_id}&status=${payload.status}`,
      method: "GET",
    });

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app-user"],
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

export const useAppUserFullAccessMutation = () => {
  const queryClient = useQueryClient();

  const updateAccess = (payload: { user_id: string; access: string }) =>
    request({
      url: `/services/en/v1/admin/giveFullAccess?full_access=${payload.access}&user_id=${payload.user_id}`,
      method: "GET",
    });

  return useMutation({
    mutationFn: updateAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app-user"],
      });
      toast.success("Full access updated successfully");
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

export const useAppUserMasterMutation = () => {
  const queryClient = useQueryClient();

  const updateMaster = (payload: { user_id: string; is_master: string }) =>
    request({
      url: `/services/en/v1/admin/setUserMaster?is_master=${payload.is_master}&user_id=${payload.user_id}`,
      method: "GET",
    });

  return useMutation({
    mutationFn: updateMaster,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app-user"],
      });
      toast.success("Master status updated successfully");
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

export const useAppUserDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteAppUser = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/deleteUser?user_id=${payload.id}`,
      method: "DELETE",
    });

  return useMutation({
    mutationFn: deleteAppUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app-user"],
      });
      toast.success("User deleted successfully");
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
