"use server";

import { provinceSchema, ProvinceSchema } from "@/schema/province.schema";
import { createProvince } from "@/server/repositories/province.repository";
import { revalidatePath } from "next/cache";

export const createProvinceAction = async (data: ProvinceSchema) => {
  try {
    const validated = provinceSchema.parse(data);
    await createProvince({ name: validated.name });
    revalidatePath("/master-data/provinces");
  } catch (error) {
    throw error;
  }
};
