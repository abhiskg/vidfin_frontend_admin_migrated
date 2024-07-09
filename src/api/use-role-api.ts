import { request } from "@/lib/axios";
import type { IUserRole } from "@/types/role.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryRoles = () => {
  const fetchRoles = async (): Promise<IUserRole[]> => {
    const data = await request({
      url: `/services/en/v1/admin/list_role`,
    });
    return data.data.role;
  };

  return useQuery({
    queryKey: ["role"],
    queryFn: fetchRoles,
  });
};

export const useQuerySingleRole = (id: string) => {
  const fetchRole = async (): Promise<IUserRole> => {
    const data = await request({
      url: `/services/en/v1/admin/list_role_name?id=${id}`,
    });
    return data.data.role;
  };

  return useQuery({
    queryKey: ["role", id],
    queryFn: fetchRole,
  });
};

export const useAddRoleMutation = () => {
  const queryClient = useQueryClient();

  const addRole = (payload: {
    role_name: string;
    permissions: Record<string, unknown>;
    status: string;
    admin_id: number;
  }) =>
    request({
      url: "/services/en/v1/admin/add_role",
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: addRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["role"],
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

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();

  const updateRole = (payload: {
    role_name: string;
    permissions: Record<string, unknown>;
    role_id: string;
  }) =>
    request({
      url: `/services/en/v1/admin/edit_role?id=${payload.role_id}`,
      method: "PATCH",
      data: {
        role_name: payload.role_name,
        permissions: payload.permissions,
      },
    });

  return useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["role"],
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

export const useRoleStatusMutation = () => {
  const queryClient = useQueryClient();

  const updateStatus = (payload: { role_id: string; status: string }) =>
    request({
      url: `/services/en/v1/admin/action_role?status=${payload.status}&id=${payload.role_id}`,
      method: "PATCH",
    });

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["role"],
      });
      toast.success("Role status updated successfully");
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

export const useRoleDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteRole = (payload: { role_id: string }) =>
    request({
      url: `/services/en/v1/admin/delete_role?id=${payload.role_id}`,
      method: "DELETE",
    });

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["role"],
      });
      toast.success("Role deleted successfully");
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
