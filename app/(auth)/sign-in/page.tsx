"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignInPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      username: auth.username,
      password: auth.password,
      redirect: false,
    });
    console.log("SignIn Response:", response);
    if (response?.ok) {
      redirect("/");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-surface-base to-brand-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <form className="space-y-4" onSubmit={(e) => onSubmit(e)}>
        <div className="space-y-1">
          <label
            htmlFor="username"
            className="block text-md font-medium text-text-brand-200"
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Masukan username"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            onChange={(e) =>
              setAuth((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-md font-medium text-text-brand-200"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Masukan password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              onChange={(e) =>
                setAuth((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-brand-500 text-white rounded hover:bg-brand-600 transition-colors my-4"
        >
          Sign In
        </button>
        <div>
          <span className="">
            Belum punya akun?{" "}
            <Link href="/sign-up" className="text-brand-500 hover:underline">
              Daftar di sini
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
