import React from "react";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { trpc, TRPCProvider } from "../server/client";
import { Login } from "./screens/Login";

export default function App() {
  return (
    <TRPCProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Home />
      </ApplicationProvider>
    </TRPCProvider>
  );
}

function Home() {
  const hello = trpc.helloRouter.hello.useQuery("Roshan");

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* {hello.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>{hello.data?.greeting}</Text>
      )} */}
      <Login />
    </Layout>
  );
}
