import { request } from "@/lib/axios";
import type { IUser } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLoginMutation = () => {
  const login = (payload: {
    email: string;
    password: string;
  }): Promise<IUser> =>
    request({
      url: "/services/en/v1/admin/login",
      method: "POST",
      data: {
        email: payload.email,
        password: payload.password,
      },
    });

  return useMutation({
    mutationFn: login,
    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};

export const useUpdateProfileMutation = () => {
  const updateProfile = (payload: {
    email: string;
    name: string;
    mobile_number: string;
    old_password?: string;
    new_password?: string;
  }): Promise<IUser> =>
    request({
      url: "/services/en/v1/admin/updateProfile",
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};

export const useForgotPasswordMutation = () => {
  const forgotPassword = (payload: { email: string }) =>
    request({
      url: `/services/en/v1/admin/forgotPassword?email=${payload.email}`,
      method: "GET",
    });

  return useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
