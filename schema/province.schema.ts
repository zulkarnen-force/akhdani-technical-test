import { z } from "zod";

export const provinceSchema = z.object({
  name: z.string().min(1),
});

export type ProvinceSchema = z.infer<typeof provinceSchema>;
