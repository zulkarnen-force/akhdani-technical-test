import { prisma } from "@/lib/prisma";
import { Province, PaginationResult } from "@/types";

export const getProvinces = async (
  page: number = 1,
): Promise<PaginationResult<Province>> => {
  const LIMIT = 10;
  const skip = (page - 1) * LIMIT;

  const [cities, total] = await Promise.all([
    prisma.province.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
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

export const createProvince = async (data: { name: string }): Promise<void> => {
  await prisma.province.create({
    data: {
      name: data.name,
    },
  });
};
