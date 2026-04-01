"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";
import { createClient } from "viem";
import "@scaffold-ui/components/styles.css";
import { getAlchemyHttpUrl } from "../utils";

export const chains = [mainnet, polygon, sepolia] as const;

const wagmiConfig = createConfig({
  chains: chains,
  connectors: [],
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getAlchemyHttpUrl(chain.id)),
    });
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function DocsProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
