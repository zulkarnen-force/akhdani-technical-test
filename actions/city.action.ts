"use server";
import { citySchema, CitySchema } from "@/schema/city.schema";
import { createCity, getCityById, updateCity } from "@/server/repositories/city.repository";
import { City } from "@/types";
import { revalidatePath } from "next/cache";

export const createCityAction = async (data: CitySchema) => {
  try {
    const city = citySchema.parse(data);

    await createCity({
      name: city.name,
      provinceId: city.provinceId,
      islandId: city.islandId,
      is_abroad: city.is_abroad,
      latitude: Number(city.latitude),
      longitude: Number(city.longitude),
    });

    revalidatePath("/master-data/cities");
  } catch (error) {
    throw error;
  }
};

export const getCityByIdAction = async (id: string): Promise<City | null> => {
  try {
    return await getCityById(id);
  } catch (error) {
    throw error;
  }
};

export const updateCityAction = async (id: string, data: CitySchema) => {
  try {
    const city = citySchema.parse(data);

    await updateCity(id, {
      name: city.name,
      provinceId: city.provinceId,
      islandId: city.islandId,
      is_abroad: city.is_abroad,
      latitude: Number(city.latitude),
      longitude: Number(city.longitude),
    });

    revalidatePath("/master-data/cities");
  } catch (error) {
    throw error;
  }
};
