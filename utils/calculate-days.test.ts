import { it, describe, expect } from "vitest";
import { calculateDays } from "./calculate-days";

describe("calculateDays", () => {
  it("should return the number of days between arrival and departure", () => {
    const arrivalDate = "2025-01-10";
    const departureDate = "2025-01-01";
    const result = calculateDays(arrivalDate, departureDate);
    expect(result).toBe(9);
  });

  it("should return the number of days between arrival and departure (one day)", () => {
    const arrivalDate = "2025-01-02";
    const departureDate = "2025-01-01";
    const result = calculateDays(arrivalDate, departureDate);
    expect(result).toBe(1);
  });

  it("should return 0 if departure date is before arrival date (diff month)", () => {
    const departureDate = "2025-02-01";
    const arrivalDate = "2025-01-02";
    const result = calculateDays(arrivalDate, departureDate);
    expect(result).toBe(0);
  });

  it("should return 0 if departure date is before arrival date (same month)", () => {
    const departureDate = "2025-01-03";
    const arrivalDate = "2025-01-02";
    const result = calculateDays(arrivalDate, departureDate);
    expect(result).toBe(0);
  });
});
