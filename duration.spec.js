// Test generateDurations function
import { generateDurations } from "./duration";
import { describe, expect, it } from "vitest";

describe("generateDurations", () => {
  it("generates durations from 0:00 to 1:00:00 with 30-minute intervals", () => {
    const result = generateDurations("0:00", "1:00:00", "30m");
    expect(result).toEqual(["0:00", "30:00", "1:00:00"]);
  });

  it("generates durations from 0:00 to 2:00 with 15-minute intervals", () => {
    const result = generateDurations("0:00", "2:00:00", "15m");
    expect(result).toEqual([
      "0:00",
      "15:00",
      "30:00",
      "45:00",
      "1:00:00",
      "1:15:00",
      "1:30:00",
      "1:45:00",
      "2:00:00",
    ]);
  });

  it("generates durations from 1:30 to 3:00 with 30-minute intervals", () => {
    const result = generateDurations("1:30:00", "3:00:00", "30m");
    expect(result).toEqual(["1:30:00", "2:00:00", "2:30:00", "3:00:00"]);
  });

  it("returns empty array if beginningDuration is greater than endingDuration", () => {
    const result = generateDurations("2:00:00", "1:00:00", "15m");
    expect(result).toEqual([]);
  });

  it("returns empty array if intervalDuration is zero or negative", () => {
    const result = generateDurations("0:00:00", "1:00:00", "0m");
    expect(result).toEqual([]);
  });

  it('handles non-standard interval formats like "1:30" (1 minute 30 seconds)', () => {
    const result = generateDurations("0:00:00", "5:00:00", "1:30:00");
    expect(result).toEqual(["0:00", "1:30:00", "3:00:00", "4:30:00"]);
  });

  it('handles non-standard interval formats like "1:00:00" (1 hour)', () => {
    const result = generateDurations("0:00:00", "3:00:00", "1:00:00");
    expect(result).toEqual(["0:00", "1:00:00", "2:00:00", "3:00:00"]);
  });

  it("throws error for invalid duration formats", () => {
    expect(() => generateDurations("invalid", "1:00", "15m")).toThrow(
      "Invalid duration format",
    );
    expect(() => generateDurations("0:00", "invalid", "15m")).toThrow(
      "Invalid duration format",
    );
    expect(() => generateDurations("0:00", "1:00", "invalid")).toThrow(
      "Invalid duration format",
    );
  });
});
