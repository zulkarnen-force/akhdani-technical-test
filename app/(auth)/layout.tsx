export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
      </div>
      <main className="w-1/2 flex items-center justify-center">{children}</main>
    </div>
  );
}
