"use client";
import { signUpAction } from "@/actions/auth.action";
import { AuthSchema, authSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthSchema) => {
    try {
      await signUpAction(data.username, data.password);
      router.push("/");
    } catch (error: any) {
      setError("username", { message: error.message });
    }
  };
  return (
    <div className="w-full max-w-md p-8 bg-surface-base to-brand-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="Masukan username"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
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
              placeholder="Masukan password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              {...register("password")}
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
          Sign Up
        </button>
        <div>
          <span className="">
            Sudah punya akun?{" "}
            <Link href="/sign-in" className="text-brand-500 hover:underline">
              Masuk di sini
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
