import { request } from "@/lib/axios";
import type { IAppVersion, IAppVersionForm } from "@/types/app-version.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryAppVersion = () => {
  const fetchAppVersion = async (): Promise<IAppVersion> => {
    const data = await request({
      url: `/services/en/v1/admin/getappversion`,
    });
    return data.data.version;
  };

  return useQuery({
    queryKey: ["app-version"],
    queryFn: fetchAppVersion,
  });
};

export const useSetAppVersionMutation = () => {
  const queryClient = useQueryClient();

  const setAppVersion = (payload: IAppVersionForm) =>
    request({
      url: `/services/en/v1/admin/setappversion`,
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: setAppVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app-version"],
      });
      toast.success("App version updated successfully");
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
