import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { z } from "zod";

// ✅ Create context
const createContext = ({ req, res }: any) => ({});
type Context = Awaited<ReturnType<typeof createContext>>;

// ✅ Setup tRPC
const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  hello: t.procedure.input(z.string()).query((opts) => {
    return { greeting: `Hello, ${opts.input}!` };
  }),
});

export type AppRouter = typeof appRouter;

// ✅ Setup Express
const app = express();
app.use(cors());
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

app.get("/", (_req, res) => {
  res.send("Mingle API is live ✅");
});

app.listen(3001, () => {
  console.log("🚀 Mingle API running at http://localhost:3001");
});
