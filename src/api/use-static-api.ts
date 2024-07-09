import { request } from "@/lib/axios";
import type { IInvestorForm } from "@/types/static.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryStaticContent = (type: string) => {
  const fetchStaticContent = async () => {
    const data = await request({
      url: `/services/en/v1/admin/get_static_content?type=${type}`,
      method: "GET",
    });
    return data.data.content;
  };

  return useQuery({
    queryKey: ["static", type],
    queryFn: fetchStaticContent,
  });
};

export const useUpdateStaticContentMutation = () => {
  const queryClient = useQueryClient();

  const updateStaticContent = (payload: {
    type: string;
    content: string;
    id: string;
  }) =>
    request({
      url: `/services/en/v1/admin/add_staticcontent`,
      method: "POST",
      data: {
        type: payload.type,
        content: payload.content,
      },
    });

  return useMutation({
    mutationFn: updateStaticContent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["static"],
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

// Investor Complaints

export const useDownloadInvestorComplaints = () => {
  const downloadInvestorComplaints = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _payload: string,
  ): Promise<{
    pdf: string;
  }> => {
    const res = await request({
      url: `/services/en/v1/user/getinvestorcomplaintpdf`,
      method: "get",
    });

    return res;
  };

  return useMutation({
    mutationFn: downloadInvestorComplaints,
    onError: (error) => {
      if (error instanceof Error && error.message !== "") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};

export const useUpdateInvestorComplaints = () => {
  const updateInvestorComplaints = (payload: IInvestorForm) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    payload.pdf = payload.pdf[0];
    return request({
      url: `/services/en/v1/admin/investorcomplaintpdf`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
  };

  return useMutation({
    mutationFn: updateInvestorComplaints,
    onSuccess: () => {
      toast.success("Investor Complaints updated successfully");
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
