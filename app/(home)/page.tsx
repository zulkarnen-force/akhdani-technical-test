import Link from "next/link";
import { hasPermissions } from "@/lib/role";
import { getAll } from "@/server/repositories/perdin-request.repository";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};
export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Not authenticated</div>;
  }
  const perdinRequestData = await getAll(parseInt(params.page || "1"), session.user.id);

  const startItem =
    perdinRequestData.totalItems === 0
      ? 0
      : (perdinRequestData.page - 1) * perdinRequestData.limit + 1;

  const endItem = Math.min(
    perdinRequestData.page * perdinRequestData.limit,
    perdinRequestData.totalItems,
  );
  return (
    <div className="p-6 bg-surface-base rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Permohonan Perjalanan Dinas</h2>
          <p className="text-sm text-muted-foreground mt-1">Daftar pengajuan perjalanan dinas</p>
        </div>
        {(await hasPermissions(["write:request"])) && (
          <Link
            href="/new"
            className="px-4 py-2 rounded-lg bg-primary text-font-primary bg-brand-100 hover:opacity-90 transition"
          >
            Tambah
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Nomor</th>
              <th className="text-left px-4 py-3 font-semibold">Tujuan</th>
              <th className="text-left px-4 py-3 font-semibold">Pemohon</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-right px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {perdinRequestData.data.length > 0 ? (
              perdinRequestData.data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border hover:bg-surface-muted/50 transition"
                >
                  <td className="px-4 py-4">{item.id}</td>

                  <td className="px-4 py-4">
                    {item.originCity.name} <span className="font-bold text-2xl">&#8594;</span>{" "}
                    {item.destinationCity.name}
                  </td>

                  <td className="px-4 py-4">{item.user.username}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${
                        item.status === "APPROVED"
                          ? "bg-green-500/10 text-green-500"
                          : item.status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                      }
                    `}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <Link href={`/${item.id}`} className="text-primary hover:underline">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center">
                  Belum ada permohonan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
          Showing {startItem} to {endItem} of {perdinRequestData.totalItems} entries
        </p>

        <div className="flex items-center gap-2">
          {perdinRequestData.hasPreviousPage && (
            <Link
              href={`?page=${perdinRequestData.page - 1}`}
              className="px-3 py-2 rounded-lg border border-border hover:bg-surface-muted transition bg-brand-50"
            >
              Previous
            </Link>
          )}

          <button
            className="underline underline-offset-4 decoration-brand-500 decoration-2 px-4"
            disabled
          >
            {perdinRequestData.page}
          </button>

          {perdinRequestData.hasNextPage && (
            <Link
              href={`?page=${perdinRequestData.page + 1}`}
              className="px-3 py-2 rounded-lg border border-border hover:bg-surface-muted transition bg-brand-100"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
