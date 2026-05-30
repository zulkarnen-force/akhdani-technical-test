"use client";
import { signOut } from "next-auth/react";

export async function signOutAction(): Promise<void> {
  await signOut({ redirect: true, callbackUrl: "/" });
}
