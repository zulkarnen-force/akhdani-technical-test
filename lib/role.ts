import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

export default async function requireRole(requiredRole: "SDM_DIVISION" | "PEGAWAI") {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  if (!session || session.user.role !== requiredRole) {
    redirect("/sign-in");
  }
  return session;
}

export async function hasPermissions(permissions: string[]) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const userPermissions = session.user.permissions;
  return permissions.some((permission) => userPermissions.includes(permission));
}
