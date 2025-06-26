import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createTRPCContext, router } from "./trpc";
import { helloRouter } from "./routers/hello";

export const appRouter = router({
  helloRouter,
});

export type AppRouter = typeof appRouter;

// ✅ Setup Express
const app = express();
app.use(cors());
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

app.get("/", (_req, res) => {
  res.send("Mingle API is live ✅");
});

app.listen(3001, () => {
  console.log("🚀 Mingle API running at http://localhost:3001");
});
