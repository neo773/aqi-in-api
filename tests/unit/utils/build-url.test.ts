import { describe, expect, test } from "bun:test";
import { buildUrl } from "../../../src/utils/build-url.util";

describe("buildUrl", () => {
  test("creates url with base and endpoint", () => {
    const url = buildUrl("https://api.example.com", "/test");

    expect(url.origin).toBe("https://api.example.com");
    expect(url.pathname).toBe("/test");
  });

  test("adds source param by default", () => {
    const url = buildUrl("https://api.example.com", "/test");

    expect(url.searchParams.get("source")).toBe("web");
  });

  test("adds provided params", () => {
    const url = buildUrl("https://api.example.com", "/test", {
      foo: "bar",
      num: 123,
    });

    expect(url.searchParams.get("foo")).toBe("bar");
    expect(url.searchParams.get("num")).toBe("123");
  });

  test("ignores undefined params", () => {
    const url = buildUrl("https://api.example.com", "/test", {
      defined: "value",
      notDefined: undefined,
    });

    expect(url.searchParams.get("defined")).toBe("value");
    expect(url.searchParams.has("notDefined")).toBe(false);
  });
});
