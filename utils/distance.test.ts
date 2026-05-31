import { describe, it, expect } from "vitest";
import { calculateDistanceInKm } from "./distance";

describe("calculateDistanceInKm", () => {
  it("should calculate distance in KM", () => {
    const distance = calculateDistanceInKm(
      107.6161215,
      -6.9024715,
      110.3644954,
      -7.7829218,
    );
    expect(distance).toBeDefined();
    expect(typeof distance).toBe("number");
    expect(distance).toEqual(307);
  });

  it("should return 0 when the same coordinates", () => {
    const distance = calculateDistanceInKm(
      107.6161215,
      -6.9024715,
      107.6161215,
      -6.9024715,
    );
    expect(distance).toBeDefined();
    expect(typeof distance).toBe("number");
    expect(distance).toEqual(0);
  });
});
