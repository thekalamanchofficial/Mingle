import { useState } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "./router";

export const trpc = createTRPCReact<AppRouter>();
let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}
function getUrl() {
  return "http://192.168.29.10:3001/trpc";
}
export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
