import { describe, expect, test } from "bun:test";
import { getSlugDepth } from "../../../src/utils/get-slug-depth.util";

describe("getSlugDepth", () => {
  test("returns 1 for country slug", () => {
    expect(getSlugDepth("india")).toBe(1);
  });

  test("returns 2 for state slug", () => {
    expect(getSlugDepth("india/delhi")).toBe(2);
  });

  test("returns 3 for city slug", () => {
    expect(getSlugDepth("india/delhi/new-delhi")).toBe(3);
  });

  test("returns 4 for station slug", () => {
    expect(getSlugDepth("india/delhi/new-delhi/janpath")).toBe(4);
  });
});
