import z from "zod";
import { publicProcedure, router } from "../trpc";

export const helloRouter = router({
  hello: publicProcedure.input(z.string()).query(({ input }) => {
    return {
      greeting: `Hello from server, ${input}!`,
    };
  }),
});
export type HelloRouter = typeof helloRouter;
