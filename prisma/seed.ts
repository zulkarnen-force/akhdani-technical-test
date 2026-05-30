import "dotenv/config";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./../app/generated/prisma/client";
import bcrypt from "bcryptjs";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    await prisma.perdinRequest.deleteMany();
    await prisma.city.deleteMany();
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
      data: [{ name: "Jawa" }, { name: "Sumatra" }, { name: "Bali" }, { name: "Pulau Singapura" }],
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

    await prisma.city.createMany({
      data: [
        {
          name: "Jakarta",
          islandId: jawa?.id,
          province: "DKI Jakarta",
          is_abroad: false,
          latitude: -6.2088,
          longitude: 106.8456,
        },
        {
          name: "Surabaya",
          islandId: jawa?.id,
          province: "Jawa Timur",
          is_abroad: false,
          latitude: -7.2575,
          longitude: 112.7521,
        },
        {
          name: "Bandung",
          islandId: jawa?.id,
          province: "Jawa Barat",
          is_abroad: false,
          latitude: -6.9175,
          longitude: 107.6191,
        },
        {
          name: "Medan",
          islandId: sumatra?.id,
          province: "Sumatera Utara",
          is_abroad: false,
          latitude: 3.5952,
          longitude: 98.6722,
        },
        {
          name: "Denpasar",
          islandId: bali?.id,
          province: "Bali",
          is_abroad: false,
          latitude: -8.65,
          longitude: 115.2167,
        },
        {
          name: "Singapore",
          islandId: singapura?.id,
          province: "Singapura",
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
