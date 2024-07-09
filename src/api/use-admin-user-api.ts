import { request } from "@/lib/axios";
import type { IAdminUser } from "@/types/admin-user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryAdminUsers = () => {
  const fetchAdminUsers = async (): Promise<IAdminUser[]> => {
    const data = await request({
      url: `/services/en/v1/admin/admin_user_list`,
    });
    return data.data.admin;
  };

  return useQuery({
    queryKey: ["admin-user"],
    queryFn: fetchAdminUsers,
  });
};

export const useAddAdminUserMutation = () => {
  const queryClient = useQueryClient();

  const addAdminUser = (payload: {
    name: string;
    email: string;
    password: string;
    admin_type: string;
    role_id: string;
  }) =>
    request({
      url: `/services/en/v1/admin/admin_user_add`,
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: addAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-user"],
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

export const useUpdateAdminUserMutation = () => {
  const queryClient = useQueryClient();

  const updateAdminUser = (payload: {
    name: string;
    email?: string;
    password?: string;
    admin_id: string;
    role_id: string;
  }) =>
    request({
      url: `/services/en/v1/admin/admin_user_edit`,
      method: "PATCH",
      data: payload,
    });

  return useMutation({
    mutationFn: updateAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-user"],
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

export const useAdminUserStatusMutation = () => {
  const queryClient = useQueryClient();

  const updateStatus = (payload: { admin_id: string; status: string }) =>
    request({
      url: `/services/en/v1/admin/admin_user_action?admin_id=${payload.admin_id}&status=${payload.status}`,
      method: "PATCH",
    });

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-user"],
      });
      toast.success("Admin user status updated successfully");
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

export const useAdminUserDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteAdminUser = (payload: { admin_id: string }) =>
    request({
      url: `/services/en/v1/admin/admin_user_delete?admin_id=${payload.admin_id}`,
      method: "DELETE",
    });

  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-user"],
      });
      toast.success("Admin user deleted successfully");
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
