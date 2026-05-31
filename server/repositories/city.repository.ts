import { prisma } from "@/lib/prisma";
import { City, CityName, PaginationResult } from "@/types";

export const getCityNames = async (): Promise<CityName[]> => {
  return await prisma.city.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export const getCities = async (
  page: number = 1,
): Promise<PaginationResult<City>> => {
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
        province: {
          select: {
            id: true,
            name: true,
          },
        },
        island: {
          select: {
            id: true,
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

export const getCityById = async (id: string): Promise<City | null> => {
  return await prisma.city.findUnique({
    select: {
      id: true,
      name: true,
      is_abroad: true,
      latitude: true,
      longitude: true,
      province: {
        select: {
          id: true,
          name: true,
        },
      },
      island: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: { id: id },
  });
};

export const findUniqueCityOrThrow = async (id: string) => {
  return await prisma.city.findUniqueOrThrow({
    select: {
      islandId: true,
      province: true,
      is_abroad: true,
      latitude: true,
      longitude: true,
    },
    where: { id: id },
  });
};

export const createCity = async (data: {
  name: string;
  provinceId: string;
  islandId: string;
  longitude: number;
  latitude: number;
  is_abroad: boolean;
}): Promise<void> => {
  try {
    await prisma.city.create({
      data: {
        name: data.name,
        provinceId: data.provinceId,
        islandId: data.islandId,
        longitude: Number(data.longitude),
        latitude: Number(data.latitude),
        is_abroad: data.is_abroad,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateCity = async (
  id: string,
  data: {
    name: string;
    provinceId: string;
    islandId: string;
    longitude: number;
    latitude: number;
    is_abroad: boolean;
  },
): Promise<void> => {
  try {
    await prisma.city.update({
      where: { id: id },
      data: {
        name: data.name,
        provinceId: data.provinceId,
        islandId: data.islandId,
        longitude: Number(data.longitude),
        latitude: Number(data.latitude),
        is_abroad: data.is_abroad,
      },
    });
  } catch (error) {
    throw error;
  }
};
