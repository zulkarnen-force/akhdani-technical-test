import { getCities } from "@/server/repositories/city.repository";
import Card from "@/components/ui/card";
import Link from "next/link";

export default async function MasterDataPage() {
  const cities = await getCities();
  const startItem =
    cities.totalItems === 0 ? 0 : (cities.page - 1) * cities.limit + 1;
  const endItem = Math.min(cities.page * cities.limit, cities.totalItems);
  return (
    <Card>
      <Card.Header>
        <div>
          <Card.Title>Master Data</Card.Title>
          <Card.Header.Description>Master data kota</Card.Header.Description>
        </div>
        <Card.Button href="/master-data/cities/new">Tambah</Card.Button>
      </Card.Header>
      <div className="flex gap-2"></div>
      <Card.Content>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">ID</th>
                <th className="text-left px-4 py-3 font-semibold">Nama</th>
                <th className="text-left px-4 py-3 font-semibold">Pulau</th>
                <th className="text-left px-4 py-3 font-semibold">Provinsi</th>
                <th className="text-left px-4 py-3 font-semibold">
                  Luar Negeri
                </th>
                <th className="text-left px-4 py-3 font-semibold">Latitude</th>
                <th className="text-left px-4 py-3 font-semibold">Longitude</th>
                <th className="px-4 py-3 font-semibold text-start">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cities.data.map((city) => (
                <tr
                  key={city.id}
                  className="border-b border-border hover:bg-surface-muted/50 transition"
                >
                  <td className="px-4 py-4">{city.id}</td>
                  <td className="px-4 py-4">{city.name}</td>
                  <td className="px-4 py-4">{city.island.name}</td>
                  <td className="px-4 py-4">{city.province.name}</td>
                  <td className="px-4 py-4">
                    {city.is_abroad ? "Ya" : "Tidak"}
                  </td>
                  <td className="px-4 py-4">{city.latitude}</td>
                  <td className="px-4 py-4">{city.longitude}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex gap-2">
                      <Link
                        href={`/master-data/cities/${city.id}/edit`}
                        className="text-primary hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {cities.totalItems}{" "}
            entries
          </p>

          <div className="flex items-center gap-2">
            {cities.hasPreviousPage && (
              <Link
                href={`?page=${cities.page - 1}`}
                className="px-3 py-2 rounded-lg border border-border hover:bg-surface-muted transition bg-brand-50"
              >
                Previous
              </Link>
            )}

            <button
              className="underline underline-offset-4 decoration-brand-500 decoration-2 px-4"
              disabled
            >
              {cities.page}
            </button>

            {cities.hasNextPage && (
              <Link
                href={`?page=${cities.page + 1}`}
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
