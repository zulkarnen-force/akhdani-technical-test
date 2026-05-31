"use server";
import NavLink from "@/components/layout/navlink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Header from "@/components/layout/header";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/sign-in");
  if (!session.user.role) redirect("/sign-in");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <Header user={session.user} />
      <div className="flex min-h-0 flex-1">
        <aside className="bg-surface-muted text-secondary-foreground w-64 p-4 mr-4 shadow">
          <NavLink role={session.user.role} />
        </aside>
        <main className="min-w-0 flex-1 justify-center items-center overflow-auto px-6 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
