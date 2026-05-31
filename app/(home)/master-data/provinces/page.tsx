import { getProvinces } from "@/server/repositories/province.repository";
import Card from "@/components/ui/card";
import Link from "next/link";

export default async function MasterDataProvincePages() {
  const provinces = await getProvinces();
  const startItem =
    provinces.totalItems === 0 ? 0 : (provinces.page - 1) * provinces.limit + 1;

  const endItem = Math.min(
    provinces.page * provinces.limit,
    provinces.totalItems,
  );
  return (
    <Card>
      <Card.Header>
        <div>
          <Card.Title>Master Data</Card.Title>
          <Card.Header.Description>
            Master data provinsi
          </Card.Header.Description>
        </div>
        <Card.Button href="/master-data/provinces/new">Tambah</Card.Button>
      </Card.Header>
      <div className="flex gap-2"></div>
      <Card.Content>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">ID</th>
                <th className="text-left px-4 py-3 font-semibold">Nama</th>
              </tr>
            </thead>
            <tbody>
              {provinces.data.map((prov) => (
                <tr
                  key={prov.id}
                  className="border-b border-border hover:bg-surface-muted/50 transition"
                >
                  <td className="px-4 py-4">{prov.id}</td>
                  <td className="px-4 py-4">{prov.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {provinces.totalItems} entries
          </p>

          <div className="flex items-center gap-2">
            {provinces.hasPreviousPage && (
              <Link
                href={`?page=${provinces.page - 1}`}
                className="px-3 py-2 rounded-lg border border-border hover:bg-surface-muted transition bg-brand-50"
              >
                Previous
              </Link>
            )}

            <button
              className="underline underline-offset-4 decoration-brand-500 decoration-2 px-4"
              disabled
            >
              {provinces.page}
            </button>

            {provinces.hasNextPage && (
              <Link
                href={`?page=${provinces.page + 1}`}
                className="px-3 py-2 rounded-lg border border-border hover:bg-surface-muted transition bg-brand-100"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
