import { z } from "zod";

export const travelSchema = z
  .object({
    origin: z.string().min(1, "Asal wajib dipilih"),
    destination: z.string().min(1, "Tujuan wajib dipilih"),
    departureDate: z.string().min(1, "Tanggal berangkat wajib diisi"),
    arrivalDate: z.string().min(1, "Tanggal kembali wajib diisi"),
  })
  .refine(
    (data) => {
      const start = new Date(data.departureDate);
      const end = new Date(data.arrivalDate);

      return end >= start;
    },
    {
      message: "Tanggal kembali tidak boleh sebelum tanggal berangkat",
      path: ["arrivalDate"],
    },
  );

export type TravelSchema = z.infer<typeof travelSchema>;
