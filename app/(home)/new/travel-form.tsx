"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { travelSchema, TravelSchema } from "@/schema/travel.schema";
import { createTravel } from "./actions";
import { City } from "@/lib/types";

interface Props {
  cities: City[];
}

export default function TravelRequestForm({ cities }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelSchema>({
    resolver: zodResolver(travelSchema),
    defaultValues: {
      origin: "",
      destination: "",
      departureDate: "",
      arrivalDate: "",
    },
  });

  const departureDate = watch("departureDate");
  const arrivalDate = watch("arrivalDate");

  const hari = useMemo(() => {
    if (!departureDate || !arrivalDate) return 0;

    const start = new Date(departureDate);
    const end = new Date(arrivalDate);
    const diffTime = end.getTime() - start.getTime();

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= 0 ? diffDays : 0;
  }, [departureDate, arrivalDate]);

  const onSubmit = async (data: TravelSchema) => {
    try {
      await createTravel(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-surface-base rounded-xl shadow-md max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Permohonan Perjalanan Dinas</h2>
          <p className="text-sm text-muted-foreground mt-1">Tambah permohonan baru</p>
        </div>
      </div>

      <form
        className="bg-surface-base p-6 rounded-lg border border-border my-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* kota */}
        <div className="grid grid-cols-3 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium">Asal</label>

            <select
              className="mt-1 block w-full rounded-md border px-3 py-2"
              {...register("origin")}
            >
              <option value="">Pilih asal</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.origin && <p className="text-sm text-red-500 mt-1">{errors.origin.message}</p>}
          </div>

          <div className="mx-auto my-6">
            <span>Ke</span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Tujuan</label>

            <select
              className="mt-1 block w-full rounded-md border px-3 py-2"
              {...register("destination")}
            >
              <option value="">Pilih tujuan</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.destination && (
              <p className="text-sm text-red-500 mt-1">{errors.destination.message}</p>
            )}
          </div>
        </div>

        {/* tanggal */}
        <div className="grid grid-cols-3 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium">Tanggal Berangkat</label>

            <input
              type="date"
              className="mt-1 block w-full rounded-md border px-3 py-2"
              {...register("departureDate")}
            />
            {errors.departureDate && (
              <p className="text-sm text-red-500 mt-1">{errors.departureDate.message}</p>
            )}
          </div>

          <div className="mx-auto my-6">
            <span>Hingga</span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Tanggal Kembali</label>

            <input
              type="date"
              className="mt-1 block w-full rounded-md border px-3 py-2"
              {...register("arrivalDate")}
            />
            {errors.arrivalDate && (
              <p className="text-sm text-red-500 mt-1">{errors.arrivalDate.message}</p>
            )}
          </div>
        </div>

        <div className="flex bg-surface-base p-6 rounded-lg border border-border items-center justify-between mt-10">
          <div className="flex flex-col w-full">
            <div className="flex justify-between gap-2">
              <span>Total waktu perjalanan</span>
              <span className="font-medium">{hari} hari</span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Biaya</span>
              <span className="font-medium">Rp 1.000.000</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="mt-4 px-4 py-2 bg-brand-50 text-text-body rounded-md">
            Hitung
          </button>
        </div>
      </form>
    </div>
  );
}
