import { prisma } from "@/lib/prisma";
import { PaginationResult, PerdinRequest } from "@/lib/types";

export const getAll = async (page: number = 1): Promise<PaginationResult<PerdinRequest>> => {
  const skip = (page - 1) * 10;

  const [data, total] = await Promise.all([
    prisma.perdinRequest.findMany({
      select: {
        id: true,
        arrivalDate: true,
        departureDate: true,
        currency: true,
        destinationCity: {
          select: {
            id: true,
            name: true,
          },
        },
        originCity: {
          select: {
            id: true,
            name: true,
          },
        },
        status: true,
        user: {
          select: {
            username: true,
          },
        },
      },
      skip,
      take: 10,
    }),
    prisma.perdinRequest.count(),
  ]);

  return {
    data,
    total,
    page,
    pageSize: Math.ceil(total / 10),
  };
};
