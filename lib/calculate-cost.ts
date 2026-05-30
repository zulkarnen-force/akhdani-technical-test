import {
  ABOARD_COST_PERDAY,
  IN_PROVINCE_COST_MIN_60_KM,
  OUT_PROVINCE_COST_DIFFERENT_ISLAND_MIN_60_KM,
  OUT_PROVINCE_COST_SAME_ISLAND_MIN_60_KM,
} from "./const";

type CostCalculation = {
  travelCost: number;
  currency: "IDR" | "USD";
};

type CalculateCostParams = {
  origin: {
    island: string;
    province: string;
  };
  destination: {
    island: string;
    province: string;
  };
  days: number;
  km: number;
  isAbroad: boolean;
};

export function calculateCost({
  km,
  days,
  destination,
  origin,
  isAbroad,
}: CalculateCostParams): CostCalculation {
  if (km <= 60) {
    return { travelCost: 0, currency: isAbroad ? "USD" : "IDR" };
  }
  if (isAbroad) {
    return { travelCost: days * ABOARD_COST_PERDAY, currency: "USD" };
  }
  if (origin.province !== destination.province && origin.island !== destination.island) {
    return { travelCost: OUT_PROVINCE_COST_DIFFERENT_ISLAND_MIN_60_KM, currency: "IDR" };
  }
  if (origin.province !== destination.province && origin.island === destination.island) {
    return { travelCost: OUT_PROVINCE_COST_SAME_ISLAND_MIN_60_KM, currency: "IDR" };
  }
  return { travelCost: IN_PROVINCE_COST_MIN_60_KM, currency: "IDR" };
}
