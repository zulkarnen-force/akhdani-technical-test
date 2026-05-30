import { prisma } from "@/lib/prisma";
import { PaginationResult, PerdinRequest } from "@/lib/types";

export const getAll = async (page: number = 1): Promise<PaginationResult<PerdinRequest>> => {
  const LIMIT = 10;
  const skip = (page - 1) * LIMIT;

  const [data, total] = await Promise.all([
    prisma.perdinRequest.findMany({
      select: {
        id: true,
        arrivalDate: true,
        departureDate: true,
        currency: true,
        travelCost: true,
        totalKm: true,
        totalDay: true,
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
      take: LIMIT,
    }),
    prisma.perdinRequest.count(),
  ]);

  const totalPages = Math.ceil(total / LIMIT);

  return {
    data: data.map((item) => ({
      ...item,
      travelCost: item.travelCost ? item.travelCost.toNumber() : 0,
      days: item?.totalDay ? item?.totalDay : 0,
      km: item?.totalKm ? item?.totalKm : 0,
    })),
    page,
    limit: LIMIT,
    totalItems: total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

export const getById = async (id: string): Promise<PerdinRequest | null> => {
  const result = await prisma.perdinRequest.findUnique({
    where: { id },
    select: {
      id: true,
      arrivalDate: true,
      departureDate: true,
      currency: true,
      travelCost: true,
      totalKm: true,
      totalDay: true,
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
  });

  if (!result) return null;

  return {
    ...result,
    travelCost: result?.travelCost ? result?.travelCost?.toNumber() : 0,
    days: result?.totalDay ? result?.totalDay : 0,
    km: result?.totalKm ? result?.totalKm : 0,
  };
};
