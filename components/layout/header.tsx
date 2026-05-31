import Image from "next/image";
import SignOut from "@/components/features/auth/sign-out";
import { Role } from "@/types";

export default function Header({
  user,
}: {
  user: {
    username: string;
    role: Role;
  };
}) {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">PT Akhdani Reka Solusi</h1>
        <span className="text-text-muted">
          a software & data engineering company
        </span>
        <div className="mt-1 h-0.5 w-8 bg-current rounded-full" />
      </div>
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
                <p className="text-sm font-semibold text-gray-900">
                  @{user.username}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.role}</p>
              </div>
              <SignOut />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
