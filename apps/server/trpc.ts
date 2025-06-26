import { initTRPC } from "@trpc/server";

export const createTRPCContext = async ({ req, res }: any) => ({});

const trpc = initTRPC.context<typeof createTRPCContext>().create();

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
