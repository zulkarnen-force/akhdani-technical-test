"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { travelSchema, type TravelSchema } from "@/schema/travel.schema";
import { getServerSession } from "next-auth";

export async function createTravel(data: TravelSchema) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validated = travelSchema.parse(data);

  const result = await prisma.perdinRequest.create({
    data: {
      originCityId: validated.origin,
      destinationCityId: validated.destination,
      departureDate: new Date(validated.departureDate),
      arrivalDate: new Date(validated.arrivalDate),
      currency: "IDR",
      userId: session.user.id,
    },
  });

  return result;
}
