import { apiImageEndpoint } from "@/generated-assets/api";
import type { APIRoute, GetStaticPaths } from "astro";

export const getStaticPaths: GetStaticPaths = () => [
  {
    params: {
      __image: "test",
      __type: "jpg",
    },
    props: {},
  },
];

export const GET: APIRoute = apiImageEndpoint(
  import.meta.glob("./_*.tsx", { eager: true }),
);
