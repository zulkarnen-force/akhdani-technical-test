"use server";
import NavLink from "./navlink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
  if (!session.user.role) redirect("/sign-in");
  console.info(session.user.role);
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <header className="bg-primary text-primary-foreground p-4 shadow-md ">
        <h1 className="text-2xl font-bold">My App</h1>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="bg-surface-muted text-secondary-foreground w-64 p-4 mr-4">
          <NavLink role={session.user.role} />
        </aside>
        <main className="min-w-0 flex-1 overflow-auto px-6 py-8 sm:px-8"> {children}</main>
      </div>
    </div>
  );
}
