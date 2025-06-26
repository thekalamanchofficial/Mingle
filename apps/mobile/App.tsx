import React from "react";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../server"; // Adjust the import path as necessary

const trpc = createTRPCReact<AppRouter>();
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3001/trpc",
    }),
  ],
});

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Home />
        </ApplicationProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function Home() {
  const hello = trpc.helloRouter.hello.useQuery("Roshan");
  console.log("Hello query result:", hello);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {hello.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>{hello.data?.greeting}</Text>
      )}
    </Layout>
  );
}
