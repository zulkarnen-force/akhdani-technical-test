"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { authOptions } from "@/lib/auth";
import { calculateCost } from "@/lib/calculate-cost";
import { calculateDistanceInKm } from "@/lib/distance";
import { prisma } from "@/lib/prisma";

import { travelSchema, type TravelSchema } from "@/schema/travel.schema";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const calculateDays = (arrivalDate: string, departureDate: string): number => {
  const start = new Date(departureDate);
  const end = new Date(arrivalDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
};

export async function createTravel(data: TravelSchema): Promise<void> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const validated = travelSchema.parse(data);

    const [originCity, destinationCity] = await Promise.all([
      prisma.city.findUniqueOrThrow({
        select: {
          islandId: true,
          province: true,
          is_abroad: true,
          latitude: true,
          longitude: true,
        },
        where: { id: validated.origin },
      }),
      prisma.city.findUniqueOrThrow({
        select: {
          islandId: true,
          province: true,
          is_abroad: true,
          latitude: true,
          longitude: true,
        },
        where: { id: validated.destination },
      }),
    ]);

    const totalKm = calculateDistanceInKm(
      originCity.latitude,
      originCity.longitude,
      destinationCity.latitude,
      destinationCity.longitude,
    );

    const totalDays = calculateDays(validated.arrivalDate, validated.departureDate);

    const calulatedCost = calculateCost({
      km: totalKm,
      days: totalDays,
      destination: {
        island: destinationCity.islandId,
        province: destinationCity.province,
      },
      origin: {
        island: originCity.islandId,
        province: originCity.province,
      },
      isAbroad: originCity.is_abroad || destinationCity.is_abroad,
    });

    await prisma.perdinRequest.create({
      data: {
        originCityId: validated.origin,
        destinationCityId: validated.destination,
        departureDate: new Date(validated.departureDate),
        arrivalDate: new Date(validated.arrivalDate),
        currency: calulatedCost.currency,
        travelCost: Prisma.Decimal(calulatedCost.travelCost),
        totalKm: totalKm,
        totalDay: totalDays,
        userId: session.user.id,
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}
