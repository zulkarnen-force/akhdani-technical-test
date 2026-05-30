"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
