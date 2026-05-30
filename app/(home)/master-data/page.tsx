import { getCities } from "@/app/repositories/city.repository";
import Card from "@/components/card";
import Link from "next/link";

export default async function MasterDataPage() {
  const cities = await getCities();
  return (
    <Card>
      <Card.Header>
        <div>
          <Card.Title>Master Data</Card.Title>
          <Card.Header.Description>This is the master data page</Card.Header.Description>
        </div>
        <Card.Button href="/master-data/cities">Tambah</Card.Button>
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
                <th className="text-left px-4 py-3 font-semibold">Luar Negeri</th>
                <th className="text-left px-4 py-3 font-semibold">Latitude</th>
                <th className="text-left px-4 py-3 font-semibold">Longitude</th>
                <th className="px-4 py-3 font-semibold text-center">Aksi</th>
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
                  <td className="px-4 py-4">{city.province}</td>
                  <td className="px-4 py-4">{city.is_abroad ? "Ya" : "Tidak"}</td>
                  <td className="px-4 py-4">{city.latitude}</td>
                  <td className="px-4 py-4">{city.longitude}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/master-data/cities/${city.id}`}
                        className="text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/master-data/cities/${city.id}/delete`}
                        className="text-danger hover:underline"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Content>
    </Card>
  );
}
