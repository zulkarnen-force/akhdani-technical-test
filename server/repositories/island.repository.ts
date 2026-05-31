import { prisma } from "@/lib/prisma";
import { Island, PaginationResult } from "@/types";

export const getIslands = async (
  page: number = 1,
): Promise<PaginationResult<Island>> => {
  const LIMIT = 10;
  const skip = (page - 1) * LIMIT;

  const [islands, total] = await Promise.all([
    prisma.island.findMany({
      select: {
        id: true,
        name: true,
      },
      skip,
      take: LIMIT,
    }),
    prisma.city.count(),
  ]);

  const totalPage = Math.ceil(total / LIMIT);

  return {
    data: islands,
    totalItems: total,
    totalPages: totalPage,
    hasNextPage: page < totalPage,
    hasPreviousPage: page > 1,
    page: page,
    limit: LIMIT,
  };
};
