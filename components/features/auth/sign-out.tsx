"use client";

import { signOutAction } from "@/app/(home)/action";

export default function SignOut() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        Sign out
      </button>
    </form>
  );
}
