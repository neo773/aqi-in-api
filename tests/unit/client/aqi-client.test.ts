import { describe, expect, test, mock, beforeEach, afterEach } from "bun:test";
import jwt from "jsonwebtoken";
import { AQIClient } from "../../../src/client/aqi-client";
import { AQIException } from "../../../src/exceptions/aqi.exception";

describe("AQIClient", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: "success", data: [] }),
      } as Response)
    );
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("creates client without config", () => {
    const client = new AQIClient();

    expect(client).toBeInstanceOf(AQIClient);
  });

  test("uses default token when not provided", async () => {
    const client = new AQIClient();

    await client.getIpDetails();

    const call = (globalThis.fetch as ReturnType<typeof mock>).mock.calls[0];
    const authHeader = call[1].headers.authorization as string;
    expect(authHeader).toStartWith("bearer ");

    const token = authHeader.replace("bearer ", "");
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    expect(decoded.userID).toBe(1);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
  });

  test("uses custom token when provided", async () => {
    const client = new AQIClient({ token: "custom-token" });

    await client.getIpDetails();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: "bearer custom-token",
        }),
      })
    );
  });

  test("uses default base url when not provided", async () => {
    const client = new AQIClient();

    await client.getIpDetails();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://apiserver.aqi.in"),
      expect.any(Object)
    );
  });

  test("uses custom base url when provided", async () => {
    const client = new AQIClient({ baseUrl: "https://custom.api.com" });

    await client.getIpDetails();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://custom.api.com"),
      expect.any(Object)
    );
  });

  test("throws AQIException on non-ok response", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: "Not Found",
        text: () => Promise.resolve("Not found"),
      } as Response)
    );

    const client = new AQIClient();

    expect(client.getIpDetails()).rejects.toBeInstanceOf(AQIException);
  });

  test("throws AQIException on failed status", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            status: "failed",
            message: "Invalid request",
            status_code: 400,
          }),
      } as Response)
    );

    const client = new AQIClient();

    expect(client.getIpDetails()).rejects.toBeInstanceOf(AQIException);
  });
});
