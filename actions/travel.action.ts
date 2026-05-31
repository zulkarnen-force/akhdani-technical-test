"use server";
import { authOptions } from "@/lib/auth";
import { calculateCost } from "@/utils/calculate-cost";
import { prisma } from "@/lib/prisma";
import { travelSchema, TravelSchema } from "@/schema/travel.schema";
import { findUniqueCityOrThrow } from "@/server/repositories/city.repository";
import { createPerdin } from "@/server/repositories/perdin-request.repository";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { calculateDistanceInKm } from "@/utils/distance";
import { calculateDays } from "@/utils/calculate-days";

export async function createTravel(data: TravelSchema): Promise<void> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const validated = travelSchema.parse(data);

    const [originCity, destinationCity] = await Promise.all([
      findUniqueCityOrThrow(validated.origin),
      findUniqueCityOrThrow(validated.destination),
    ]);

    const totalKm = calculateDistanceInKm(
      originCity.latitude,
      originCity.longitude,
      destinationCity.latitude,
      destinationCity.longitude,
    );

    const totalDays = calculateDays(
      validated.arrivalDate,
      validated.departureDate,
    );

    const calulatedCost = calculateCost({
      km: totalKm,
      days: totalDays,
      destination: {
        island: destinationCity.islandId,
        province: destinationCity.province.name,
      },
      origin: {
        island: originCity.islandId,
        province: originCity.province.name,
      },
      isAbroad: originCity.is_abroad || destinationCity.is_abroad,
    });

    await createPerdin({
      originCityId: validated.origin,
      destinationCityId: validated.destination,
      departureDate: new Date(validated.departureDate),
      arrivalDate: new Date(validated.arrivalDate),
      currency: calulatedCost.currency,
      travelCost: calulatedCost.travelCost,
      totalKm,
      totalDay: totalDays,
      userId: session.user.id,
    });

    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}

export async function setStatusAction(
  id: string,
  status: "APPROVED" | "REJECTED" | "PENDING",
): Promise<void> {
  try {
    await prisma.perdinRequest.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(`Error updating travel request status: ${error}`);
    throw new Error("Failed to update travel request status");
  }
}
