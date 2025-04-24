import { z } from "zod";

export const useFormSchema = () => {
  return z.object({
    answers: z.array(
      z.object({
        questionId: z.string(),
        correct: z.string(),
      })
    ),
  });
};

export type questionFields = z.infer<ReturnType<typeof useFormSchema>>;
