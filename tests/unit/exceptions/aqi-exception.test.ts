import { describe, expect, test } from "bun:test";
import { AQIException } from "../../../src/exceptions/aqi.exception";

describe("AQIException", () => {
  test("creates exception with message and status code", () => {
    const exception = new AQIException("Test error", 400);

    expect(exception.message).toBe("Test error");
    expect(exception.statusCode).toBe(400);
    expect(exception.name).toBe("AQIException");
  });

  test("creates exception with body", () => {
    const exception = new AQIException("Test error", 500, '{"error": "internal"}');

    expect(exception.body).toBe('{"error": "internal"}');
  });

  test("is instance of Error", () => {
    const exception = new AQIException("Test", 400);

    expect(exception).toBeInstanceOf(Error);
  });
});
