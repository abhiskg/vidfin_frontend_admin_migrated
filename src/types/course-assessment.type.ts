import { z } from "zod";

const courseAssessmentSchema = z.object({
  assessment_id: z.number(),
  course_id: z.number(),
  info: z.string(),
  passing_criteria: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ICourseAssessment = z.infer<typeof courseAssessmentSchema>;

export const courseAssessmentQuestionSchema = z.object({
  options: z.array(
    z.object({
      option: z.string(),
      is_correct: z.string(),
    }),
  ),
  question_id: z.number(),
  assessment_id: z.number(),
  course_id: z.number(),
  questions: z.string(),
  answer_description: z.string().nullable(),
  is_deleted: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ICourseAssessmentQuestion = z.infer<
  typeof courseAssessmentQuestionSchema
>;

export const courseAssessmentFormSchema = z.object({
  info: z
    .string()
    .min(1, "Info is required")
    .refine((value) => !/^\s*$/.test(value), "Info is required"),
  passing_criteria: z
    .string()
    .min(1, "Passing criteria is required")
    .refine((value) => !/^\s*$/.test(value), "Passing criteria is required")
    .refine((value) => {
      const num = Number(value);
      return num >= 0 && num <= 100;
    }, "Passing criteria should be between 0 and 100"),
});

export type ICourseAssessmentForm = z.infer<typeof courseAssessmentFormSchema>;

export const courseAssessmentQuestionFormSchema = z
  .object({
    questions: z
      .string()
      .min(1, "Question is required")
      .refine((value) => !/^\s*$/.test(value), "Question is required"),
    options: z.array(
      z.object({
        option: z
          .string()
          .min(1, "Option is required")
          .refine((value) => !/^\s*$/.test(value), "Option is required"),
        is_correct: z.string().min(1, "correct option is required"),
      }),
    ),
    answer_description: z.string().optional(),
  })
  // In options array, there can be one item with is_correct as 1 and rest as 0
  .refine(
    (value) => {
      const correctOptions = value.options.filter(
        (option) => option.is_correct === "1",
      );
      return correctOptions.length === 1;
    },
    {
      message: "There should be one correct option",
      path: ["questions"],
    },
  );

export type ICourseAssessmentQuestionForm = z.infer<
  typeof courseAssessmentQuestionFormSchema
>;
