import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { helloRouter } from "./routers/hello";
import { router } from "./trpc";

export const appRouter = router({
  helloRouter,
});

export type AppRouter = typeof appRouter;
