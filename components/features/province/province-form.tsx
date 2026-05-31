"use client";
import Card from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProvinceSchema, provinceSchema } from "@/schema/province.schema";
import { createProvinceAction } from "@/actions/province.action";

export default function ProvinceForm() {
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProvinceSchema>({
    resolver: zodResolver(provinceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: ProvinceSchema) => {
    try {
      await createProvinceAction(data);
      router.replace("/master-data/provinces");
    } catch (error) {
      alert("Failed to create province");
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
                  placeholder="Masukan nama provinsi"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
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
