import { z } from "zod";

export const citySchema = z.object({
  name: z.string().min(1),
  provinceId: z.string().min(1),
  islandId: z.string().min(1),
  longitude: z.string(),
  latitude: z.string(),
  is_abroad: z.boolean(),
});

export type CitySchema = z.infer<typeof citySchema>;
