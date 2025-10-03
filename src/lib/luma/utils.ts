import { LUMA_API_KEY } from "astro:env/server";

export function getHeaders(): HeadersInit {
  return {
    accept: "application/json",
    "x-luma-api-key": LUMA_API_KEY,
  };
}
