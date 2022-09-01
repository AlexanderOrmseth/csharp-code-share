import { z } from "zod";

// validation
export const FormValidation = z.object({
  title: z.string().trim().max(32).optional(),
  author: z.string().trim().max(32).optional(),
  code: z.string().min(10).max(9000)
});

export type FormModel = z.infer<typeof FormValidation>;
