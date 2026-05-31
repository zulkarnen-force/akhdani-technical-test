import { LinkItem } from "@/types";

const IN_PROVINCE_COST_MIN_60_KM = 200_000;
const OUT_PROVINCE_COST_SAME_ISLAND_MIN_60_KM = 250_000;
const OUT_PROVINCE_COST_DIFFERENT_ISLAND_MIN_60_KM = 300_000;
const ABOARD_COST_PERDAY = 50;

export {
  IN_PROVINCE_COST_MIN_60_KM,
  OUT_PROVINCE_COST_SAME_ISLAND_MIN_60_KM,
  OUT_PROVINCE_COST_DIFFERENT_ISLAND_MIN_60_KM,
  ABOARD_COST_PERDAY,
};

export const LINKS: LinkItem[] = [
  {
    name: "Permohonan Perjalanan Dinas",
    href: "/",
    key: "home",
    role: ["SDM_DIVISION", "PEGAWAI"],
    disable: false,
  },
  {
    name: "Master Data",
    href: "/master-data/cities",
    key: "master-data",
    role: ["SDM_DIVISION"],
    disable: true,
    childs: [
      {
        name: "Cities",
        href: "/master-data/cities",
        key: "cities",
        role: ["SDM_DIVISION"],
      },
      {
        name: "Provinces",
        href: "/master-data/provinces",
        key: "provinces",
        role: ["SDM_DIVISION"],
      },
    ],
  },
];
