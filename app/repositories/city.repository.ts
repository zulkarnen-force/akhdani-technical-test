import { prisma } from "@/lib/prisma";
import { City, CityName, PaginationResult } from "@/lib/types";

export const getCityNames = async (): Promise<CityName[]> => {
  return await prisma.city.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export const getCities = async (page: number = 1): Promise<PaginationResult<City>> => {
  const LIMIT = 10;
  const skip = (page - 1) * LIMIT;

  const [cities, total] = await Promise.all([
    prisma.city.findMany({
      select: {
        id: true,
        name: true,
        is_abroad: true,
        latitude: true,
        longitude: true,
        province: true,
        island: {
          select: {
            name: true,
          },
        },
      },
      skip,
      take: LIMIT,
    }),
    prisma.city.count(),
  ]);

  const totalPage = Math.ceil(total / LIMIT);

  return {
    data: cities,
    totalItems: total,
    totalPages: totalPage,
    hasNextPage: page < totalPage,
    hasPreviousPage: page > 1,
    page: page,
    limit: LIMIT,
  };
};
