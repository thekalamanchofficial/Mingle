import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { helloRouter } from "./routers/hello";

const t = initTRPC.create();

export const appRouter = t.router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
