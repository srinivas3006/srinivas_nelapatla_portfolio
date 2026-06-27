import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { setCookie, getCookie, deleteCookie } from "@tanstack/react-start/server";
import { getServerConfig } from "../config.server";

const AUTH_COOKIE_NAME = "admin_session";
const AUTH_COOKIE_VALUE = "authenticated"; // Simplest possible session token

export const loginAdmin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    const config = getServerConfig();
    console.log("Checking password...", {
      expected: config.adminPassword,
      provided: data.password,
    });

    if (data.password !== config.adminPassword) {
      throw new Error("Invalid password");
    }

    // Set cookie
    setCookie(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(AUTH_COOKIE_NAME);
  return { success: true };
});

export const checkAdminAuth = createServerFn({ method: "GET" }).handler(async () => {
  const cookie = getCookie(AUTH_COOKIE_NAME);
  return { isAuthenticated: cookie === AUTH_COOKIE_VALUE };
});
