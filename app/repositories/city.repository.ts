import { prisma } from "@/lib/prisma";
import { City } from "@/lib/types";

export const getCities = async (): Promise<City[]> => {
  return await prisma.city.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};
