import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = getServerSession(authOptions);
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Back! {session?.user?.name}</h1>
      </div>
      <main className="w-1/2 flex items-center justify-center">{children}</main>
    </div>
  );
}
