"use server";
import NavLink from "./navlink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { signOutAction } from "./action";
import SignOut from "./sign-out";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/sign-in");
  if (!session.user.role) redirect("/sign-in");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <header className="bg-primary text-primary-foreground p-4 shadow-md flex justify-between">
        <h1 className="text-2xl font-bold">My App</h1>
        <div className="flex items-center space-x-4">
          <div className="relative inline-block group  hover:bg-gray-100 cursor-pointer mr-2">
            <div className="relative">
              <button className="flex items-center focus:outline-none">
                <Image
                  src="/avatar-green.png"
                  alt="User Image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>
            </div>
            <div className="absolute right-0 w-48 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-right scale-95 group-hover:scale-100 z-50">
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-1 overflow-hidden">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">@{session.user.username}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user.role}</p>
                </div>
                <SignOut />
              </div>
            </div>
          </div>
        </div>
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
