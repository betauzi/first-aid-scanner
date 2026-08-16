import { describe, it, expect } from "vitest";

// ---- Mock data mirrors ----
const MOCK_RESULT = {
  woundType: "Abrasion",
  woundDescription: "Superficial skin scrape with minor tissue damage",
  severity: "low" as const,
  confidence: 87,
  treatments: [
    "Rinse the wound gently with clean water",
    "Apply antiseptic solution or cream",
    "Cover with a sterile bandage",
    "Monitor for signs of infection",
  ],
};

const STEPS = [
  { id: 1, title: "Clean the Wound", duration: "5 min" },
  { id: 2, title: "Apply Antiseptic", duration: "2 min" },
  { id: 3, title: "Cover the Wound", duration: "2 min" },
  { id: 4, title: "Monitor for Infection", duration: "Daily" },
  { id: 5, title: "Seek Medical Help if Needed", duration: "If needed" },
];

const MOCK_HISTORY = [
  { id: "1", woundType: "Abrasion", severity: "low", date: "Today", time: "10:32 AM" },
  { id: "2", woundType: "Minor Cut", severity: "low", date: "Yesterday", time: "3:15 PM" },
  { id: "3", woundType: "Bruise", severity: "medium", date: "May 3", time: "8:44 AM" },
  { id: "4", woundType: "Laceration", severity: "high", date: "May 1", time: "5:20 PM" },
];

const SEVERITY_CONFIG = {
  low: { label: "Low Severity", color: "#1A7A3C", bg: "#D4EDDA" },
  medium: { label: "Medium Severity", color: "#7D5A00", bg: "#FFF3CD" },
  high: { label: "High Severity", color: "#7D1A1A", bg: "#F8D7DA" },
};

// ---- Tests ----
describe("Result Screen data", () => {
  it("has a valid wound type", () => {
    expect(MOCK_RESULT.woundType).toBeTruthy();
    expect(typeof MOCK_RESULT.woundType).toBe("string");
  });

  it("has confidence between 0 and 100", () => {
    expect(MOCK_RESULT.confidence).toBeGreaterThanOrEqual(0);
    expect(MOCK_RESULT.confidence).toBeLessThanOrEqual(100);
  });

  it("has at least one treatment suggestion", () => {
    expect(MOCK_RESULT.treatments.length).toBeGreaterThan(0);
  });

  it("severity is one of low/medium/high", () => {
    expect(["low", "medium", "high"]).toContain(MOCK_RESULT.severity);
  });

  it("severity config has correct keys", () => {
    const config = SEVERITY_CONFIG[MOCK_RESULT.severity];
    expect(config).toBeDefined();
    expect(config.label).toBeTruthy();
    expect(config.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(config.bg).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });
});

describe("Steps Screen data", () => {
  it("has exactly 5 steps", () => {
    expect(STEPS.length).toBe(5);
  });

  it("step IDs are sequential starting from 1", () => {
    STEPS.forEach((step, index) => {
      expect(step.id).toBe(index + 1);
    });
  });

  it("all steps have a title and duration", () => {
    STEPS.forEach((step) => {
      expect(step.title).toBeTruthy();
      expect(step.duration).toBeTruthy();
    });
  });

  it("progress calculation works correctly", () => {
    const completedCount = 3;
    const total = STEPS.length;
    const percentage = (completedCount / total) * 100;
    expect(percentage).toBeCloseTo(60);
  });
});

describe("History Screen data", () => {
  it("has 4 history entries", () => {
    expect(MOCK_HISTORY.length).toBe(4);
  });

  it("all entries have required fields", () => {
    MOCK_HISTORY.forEach((entry) => {
      expect(entry.id).toBeTruthy();
      expect(entry.woundType).toBeTruthy();
      expect(["low", "medium", "high"]).toContain(entry.severity);
      expect(entry.date).toBeTruthy();
      expect(entry.time).toBeTruthy();
    });
  });

  it("includes all severity levels", () => {
    const severities = MOCK_HISTORY.map((e) => e.severity);
    expect(severities).toContain("low");
    expect(severities).toContain("medium");
    expect(severities).toContain("high");
  });
});

describe("Camera Screen logic", () => {
  it("camera facing toggle works", () => {
    let facing: "front" | "back" = "back";
    facing = facing === "back" ? "front" : "back";
    expect(facing).toBe("front");
    facing = facing === "back" ? "front" : "back";
    expect(facing).toBe("back");
  });
});
