/* eslint-disable @typescript-eslint/ban-ts-comment */
import { request } from "@/lib/axios";
import type {
  ICourseAssessment,
  ICourseAssessmentForm,
  ICourseAssessmentQuestion,
  ICourseAssessmentQuestionForm,
} from "@/types/course-assessment.type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

//Assessment
export const useQueryCourseAssessment = ({
  course_id,
}: {
  course_id: string;
}) => {
  const fetchCourseAssessment = async (): Promise<ICourseAssessment | null> => {
    const data = await request({
      url: `/services/en/v1/admin/get_assesment?course_id=${course_id}`,
      method: "GET",
    });
    return data.data.assessment;
  };

  return useQuery({
    queryKey: ["course-assessment", course_id],
    queryFn: fetchCourseAssessment,
  });
};

export const useAddCourseAssessmentMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const addCourseAssessmentQuestion = (
    payload: ICourseAssessmentForm & {
      course_id: string;
      assessment_id?: string;
    },
  ) => {
    if (!payload.assessment_id) delete payload.assessment_id;
    //@ts-ignore
    payload.passing_criteria = Number(payload.passing_criteria);
    return request({
      url: "/services/en/v1/admin/add_assesment",
      method: "POST",
      data: payload,
    });
  };

  return useMutation({
    mutationFn: addCourseAssessmentQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-assessment", cacheId],
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

//Assessment Questions
export const useQueryCourseAssessmentQuestions = ({
  course_id,
  assesment_id,
}: {
  course_id: string;
  assesment_id: string;
}) => {
  const fetchCourseAssessmentQuestions = async (): Promise<
    ICourseAssessmentQuestion[]
  > => {
    const data = await request({
      url: `/services/en/v1/admin/get_assesment_question_list?course_id=${course_id}&assesment_id=${assesment_id}`,
      method: "GET",
    });
    return data.data.assessmentQuestion;
  };

  return useQuery({
    queryKey: ["course-assessment-question", course_id],
    queryFn: fetchCourseAssessmentQuestions,
    enabled: !!assesment_id,
  });
};

export const useAddCourseAssessmentQuestionMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const addCourseAssessmentQuestion = (
    payload: ICourseAssessmentQuestionForm & {
      course_id: string;
      assessment_id: string;
    },
  ) => {
    if (!payload.answer_description) {
      delete payload.answer_description;
    }
    return request({
      url: "/services/en/v1/admin/add_assesment_question",
      method: "POST",
      data: payload,
    });
  };

  return useMutation({
    mutationFn: addCourseAssessmentQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-assessment-question", cacheId],
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

export const useUpdateCourseAssessmentQuestionMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const updateCourseAssessmentQuestion = (
    payload: ICourseAssessmentQuestionForm & {
      question_id: string;
      course_id: string;
      assesment_id: string;
    },
  ) => {
    if (!payload.answer_description) {
      delete payload.answer_description;
    }
    return request({
      url: "/services/en/v1/admin/update_assesment_question",
      method: "PATCH",
      data: payload,
    });
  };

  return useMutation({
    mutationFn: updateCourseAssessmentQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-assessment-question", cacheId],
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

export const useDeleteCourseAssessmentQuestionMutation = (cacheId: string) => {
  const queryClient = useQueryClient();

  const deleteCourseAssessmentQuestion = (payload: { question_id: string }) =>
    request({
      url: `/services/en/v1/admin/delete_assesment_question?question_id=${payload.question_id}`,
      method: "DELETE",
      data: payload,
    });

  return useMutation({
    mutationFn: deleteCourseAssessmentQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-assessment-question", cacheId],
      });
      toast.success("Assessment question deleted successfully");
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
