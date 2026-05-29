import { describe, it, expect } from "vitest";
import { getDistanceFromLatLonInKm } from "./distance";

describe("getDistanceFromLatLonInKm", () => {
  it("should calculate distance in KM", () => {
    const distance = getDistanceFromLatLonInKm(107.6161215, -6.9024715, 110.3644954, -7.7829218);
    expect(distance).toBeDefined();
    expect(typeof distance).toBe("number");
    expect(distance).toEqual(307);
  });
});
