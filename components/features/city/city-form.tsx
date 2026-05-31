"use client";
import { createCityAction } from "@/actions/city.action";
import Card from "@/components/ui/card";
import { Island, Province } from "@/types";
import { citySchema, CitySchema } from "@/schema/city.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function CityForm({
  islands,
  provinces,
}: {
  islands: Island[];
  provinces: Province[];
}) {
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CitySchema>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      is_abroad: false,
      islandId: "",
      provinceId: "",
      latitude: "0",
      longitude: "0",
      name: "",
    },
  });

  const onSubmit = async (data: CitySchema) => {
    try {
      await createCityAction(data);
      console.info("City created successfully");
      router.replace("/master-data/cities");
    } catch (error) {
      alert("Failed to create city");
    }
  };

  return (
    <Card className="flex flex-col justify-between mb-6">
      <Card.Header>
        <div>
          <Card.Header.Title>Master Data City</Card.Header.Title>
          <Card.Header.Description>
            Halaman untuk menambahkan data kota baru
          </Card.Header.Description>
        </div>
      </Card.Header>
      <Card.Content>
        <form
          method="post"
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  placeholder="Enter name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Provinsi
              </label>
              <div className="mt-1">
                <select
                  id="province"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  {...register("provinceId")}
                >
                  <option value="">Select province</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
                {errors.provinceId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.provinceId.message}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Pulau
              </label>
              <div className="mt-1">
                <select
                  {...register("islandId")}
                  id="island"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                >
                  <option value="">Pilih Pulau</option>
                  {islands.map((island) => (
                    <option key={island.id} value={island.id}>
                      {island.name}
                    </option>
                  ))}
                </select>
                {errors.islandId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.islandId.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

          <div className="flex gap-2">
            <span className="text-text-muted italic">Koordinat</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Longitude
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.0001"
                  {...register("longitude")}
                  id="longitude"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
                {errors.longitude && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.longitude.message}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Latitude
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.0001"
                  {...register("latitude")}
                  id="latitude"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
                {errors.latitude && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.latitude.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="is_aboard"
              className="block text-sm font-medium text-gray-700"
            >
              Luar Negeri?
            </label>
            <input type="checkbox" id="is_aboard" {...register("is_abroad")} />
            {errors.is_abroad && (
              <p className="text-sm text-red-500 mt-1">
                {errors.is_abroad.message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-100 cursor-auto"
            >
              Save
            </button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
}
