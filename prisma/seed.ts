import "dotenv/config";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    await prisma.perdinRequest.deleteMany();
    await prisma.city.deleteMany();
    await prisma.province.deleteMany();
    await prisma.island.deleteMany();
    await prisma.user.deleteMany();
    await prisma.user.createMany({
      data: [
        {
          username: "sdm",
          password: await bcrypt.hash("password", 10),
          role: "SDM_DIVISION",
        },
        {
          password: await bcrypt.hash("password", 10),
          username: "pegawai",
          role: "PEGAWAI",
        },
      ],
    });

    await prisma.island.createMany({
      data: [
        { name: "Jawa" },
        { name: "Sumatra" },
        { name: "Bali" },
        { name: "Pulau Singapura" },
      ],
      skipDuplicates: true,
    });

    await prisma.province.createMany({
      data: [
        { name: "DKI Jakarta" },
        { name: "Jawa Barat" },
        { name: "Jawa Timur" },
        { name: "DI Yogyakarta" },
        { name: "Prov. Singapura" },
        { name: "Sumatera Utara" },
        { name: "Bali" },
      ],
      skipDuplicates: true,
    });

    const jawa = await prisma.island.findUnique({
      select: {
        id: true,
      },
      where: { name: "Jawa" },
    });
    const sumatra = await prisma.island.findUnique({
      select: {
        id: true,
      },
      where: { name: "Sumatra" },
    });
    const bali = await prisma.island.findUnique({
      select: {
        id: true,
      },
      where: { name: "Bali" },
    });
    const singapura = await prisma.island.findUnique({
      select: {
        id: true,
      },
      where: { name: "Pulau Singapura" },
    });

    if (!jawa || !sumatra || !bali || !singapura) {
      throw new Error("Failed to retrieve island data");
    }

    const jawaBarat = await prisma.province.findUnique({
      select: {
        id: true,
      },
      where: { name: "Jawa Barat" },
    });
    const jawaTimur = await prisma.province.findUnique({
      select: {
        id: true,
      },
      where: { name: "Jawa Timur" },
    });
    const diYogyakarta = await prisma.province.findUnique({
      select: {
        id: true,
      },
      where: { name: "DI Yogyakarta" },
    });

    const sumut = await prisma.province.findUnique({
      select: {
        id: true,
      },
      where: { name: "Sumatera Utara" },
    });

    const singaporeProv = await prisma.province.findUnique({
      select: {
        id: true,
      },
      where: { name: "Prov. Singapura" },
    });

    const baliProv = await prisma.province.findUnique({
      select: {
        id: true,
      },
      where: { name: "Bali" },
    });

    if (
      !jawaBarat ||
      !jawaTimur ||
      !diYogyakarta ||
      !sumut ||
      !baliProv ||
      !singaporeProv
    ) {
      throw new Error("Failed to retrieve province data");
    }

    await prisma.city.createMany({
      data: [
        {
          name: "Jakarta",
          islandId: jawa.id,
          provinceId: jawaBarat.id,
          is_abroad: false,
          latitude: -6.2088,
          longitude: 106.8456,
        },
        {
          name: "Surabaya",
          islandId: jawa.id,
          provinceId: jawaTimur.id,
          is_abroad: false,
          latitude: -7.2575,
          longitude: 112.7521,
        },
        {
          name: "Bandung",
          islandId: jawa.id,
          provinceId: jawaBarat.id,
          is_abroad: false,
          latitude: -6.9175,
          longitude: 107.6191,
        },
        {
          name: "Medan",
          islandId: sumatra.id,
          provinceId: sumut.id,
          is_abroad: false,
          latitude: 3.5952,
          longitude: 98.6722,
        },
        {
          name: "Denpasar",
          islandId: bali.id,
          provinceId: baliProv.id,
          is_abroad: false,
          latitude: -8.65,
          longitude: 115.2167,
        },
        {
          name: "Singapore",
          islandId: singapura.id,
          provinceId: singaporeProv.id,
          is_abroad: true,
          latitude: 1.3521,
          longitude: 103.8198,
        },
      ],
      skipDuplicates: true, // Skip seeding if data already exists
    });
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

await main();
