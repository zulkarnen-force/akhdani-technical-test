"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export const signUpAction = async (username: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      throw new Error("Username telah digunakan");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { username, password: hashedPassword, role: "PEGAWAI" },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    throw error;
  }
};
