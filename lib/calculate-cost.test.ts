import { vi, describe, it, expect } from "vitest";
import { calculateCost } from "./calculate-cost";

describe("calculateCost", () => {
  it("should return 0 cost for km <= 60", () => {
    const result = calculateCost({
      origin: { island: "Java", province: "Jakarta" },
      destination: { island: "Java", province: "Bandung" },
      days: 1,
      km: 60,
      isAbroad: false,
    });
    expect(result).toEqual({ travelCost: 0, currency: "IDR" });
  });

  it("should calculate abroad cost correctly", () => {
    const result = calculateCost({
      origin: { island: "Java", province: "Jakarta" },
      destination: { island: "Bali", province: "Denpasar" },
      days: 3,
      km: 100,
      isAbroad: false,
    });
    expect(result).toEqual({ travelCost: 300_000, currency: "IDR" });
  });

  it("should calculate different province and same island cost correctly", () => {
    const result = calculateCost({
      origin: { island: "Jawa", province: "Jawa barat" },
      destination: { island: "Jawa", province: "DKI Jakarta" },
      days: 1,
      km: 100,
      isAbroad: false,
    });
    expect(result).toEqual({ travelCost: 250_000, currency: "IDR" });
  });

  it("should calculate same province and same island cost correctly", () => {
    const result = calculateCost({
      origin: { island: "Jawa", province: "Jawa Barat" },
      destination: { island: "Jawa", province: "Jawa Barat" },
      days: 1,
      km: 100,
      isAbroad: false,
    });
    expect(result).toEqual({ travelCost: 200_000, currency: "IDR" });
  });
});
