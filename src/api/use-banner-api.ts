/* eslint-disable @typescript-eslint/ban-ts-comment */
import { request } from "@/lib/axios";
import type {
  IBanner,
  IBannerForm,
  IBannerUpdateForm,
} from "@/types/banner.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryBanners = () => {
  const fetchBanners = async (): Promise<IBanner[]> => {
    const data = await request({
      url: `/services/en/v1/admin/bannerList`,
    });
    return data.data.newRes.array;
  };

  return useQuery({
    queryKey: ["banner"],
    queryFn: fetchBanners,
  });
};

export const useAddBannerMutation = () => {
  const queryClient = useQueryClient();

  const addBanner = (payload: IBannerForm) => {
    if (!payload.banner_file) {
      delete payload.banner_file;
    } else {
      payload.banner_file = payload.banner_file[0];
    }

    if (!payload.banner_file_mobile) {
      delete payload.banner_file_mobile;
    } else {
      payload.banner_file_mobile = payload.banner_file_mobile[0];
    }
    payload.banner_file_type = "image";

    payload.end_date = payload.end_date
      .toLocaleString("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    payload.start_date = payload.start_date
      .toLocaleString("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    if (payload.banner_type === "empty") {
      // @ts-ignore
      delete payload.item_type;
      // @ts-ignore
      delete payload.item_id;
    }

    if (payload.item_type === "subscription") {
      // @ts-ignore
      delete payload.item_id;
    }

    return request({
      url: `/services/en/v1/admin/addBanner`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
  };

  return useMutation({
    mutationFn: addBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banner"],
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

export const useUpdateBannerMutation = () => {
  const queryClient = useQueryClient();

  const updateBanner = (payload: IBannerUpdateForm & { banner_id: string }) => {
    if (!payload.banner_file) {
      delete payload.banner_file;
    } else {
      payload.banner_file = payload.banner_file[0];
    }

    if (!payload.banner_file_mobile) {
      delete payload.banner_file_mobile;
    } else {
      payload.banner_file_mobile = payload.banner_file_mobile[0];
    }

    payload.end_date = payload.end_date
      .toLocaleString("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    payload.start_date = payload.start_date
      .toLocaleString("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    if (payload.banner_type === "empty") {
      // @ts-ignore
      delete payload.item_type;
      // @ts-ignore
      delete payload.item_id;
    }

    if (payload.item_type === "subscription") {
      // @ts-ignore
      delete payload.item_id;
    }

    return request({
      url: `/services/en/v1/admin/editBanner`,
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
  };

  return useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banner"],
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

export const useBannerPriorityMutation = () => {
  const queryClient = useQueryClient();

  const updatePriority = (
    payload: {
      banner_id: string;
      priority: string;
    }[],
  ) =>
    request({
      url: `/services/en/v1/admin/changePriorityBanner`,
      method: "PATCH",
      data: {
        prioritylist: payload,
      },
    });

  return useMutation({
    mutationFn: updatePriority,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banner"],
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

export const useBannerStatusMutation = () => {
  const queryClient = useQueryClient();

  const updateStatus = (payload: { id: string; status: string }) =>
    request({
      url: `/services/en/v1/admin/actionBanner?banner_id=${payload.id}&status=${payload.status}`,
      method: "PATCH",
    });

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banner"],
      });
      toast.success("Banner status updated successfully");
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

export const useBannerDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteBanner = (payload: { id: string }) =>
    request({
      url: `/services/en/v1/admin/deleteBanner?banner_id=${payload.id}`,
      method: "DELETE",
    });

  return useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banner"],
      });
      toast.success("Banner deleted successfully");
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
