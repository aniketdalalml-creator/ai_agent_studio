// Utility function tests — formatting helpers and class name merging.
import { describe, expect, it } from "vitest";

import { cn, formatDate, formatFileSize, getInitials, truncate } from "../utils";

describe("cn", () => {
  it("merges tailwind classes and resolves conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});

describe("formatDate", () => {
  it("formats ISO date as month day year", () => {
    expect(formatDate("2023-10-24T00:00:00Z")).toBe("Oct 24, 2023");
  });
});

describe("formatFileSize", () => {
  it("returns zero bytes label for zero input", () => {
    expect(formatFileSize(0)).toBe("0 B");
  });

  it("formats megabyte values with one decimal", () => {
    expect(formatFileSize(1258291)).toBe("1.2 MB");
  });
});

describe("truncate", () => {
  it("returns original string when shorter than limit", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates long strings with ellipsis", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });
});

describe("getInitials", () => {
  it("returns uppercase initials from full name", () => {
    expect(getInitials("Alex Carter")).toBe("AC");
  });
});
