import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createTRPCContext } from "./trpc";
import { appRouter } from "./router";

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
