import { request } from "@/lib/axios";
import type { IFaq } from "@/types/faq.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryFaq = () => {
  const fetchFaq = async (): Promise<IFaq[]> => {
    const data = await request({
      url: `/services/en/v1/admin/get_faq`,
    });
    return data.data.faq;
  };

  return useQuery({
    queryKey: ["faq"],
    queryFn: fetchFaq,
  });
};

export const useAddFaqMutation = () => {
  const queryClient = useQueryClient();

  const addFaq = (payload: { question: string; answer: string }) =>
    request({
      url: "/services/en/v1/admin/add_faq",
      method: "POST",
      data: payload,
    });

  return useMutation({
    mutationFn: addFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faq"],
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

export const useUpdateFaqMutation = () => {
  const queryClient = useQueryClient();

  const updateFaq = (payload: {
    id: string;
    question: string;
    answer: string;
  }) =>
    request({
      url: `/services/en/v1/admin/edit_faq`,
      method: "PATCH",
      data: payload,
    });

  return useMutation({
    mutationFn: updateFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faq"],
      });
      toast.success("FAQ updated successfully");
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

export const useFaqDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteFaq = (payload: { faq_id: string }) =>
    request({
      url: `/services/en/v1/admin/delete_faq?id=${payload.faq_id}`,
      method: "DELETE",
    });

  return useMutation({
    mutationFn: deleteFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faq"],
      });
      toast.success("FAQ deleted successfully");
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
