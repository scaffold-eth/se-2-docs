import {
  mainnet,
  sepolia,
  optimism,
  optimismSepolia,
  arbitrum,
  arbitrumSepolia,
  polygon,
  polygonAmoy,
  base,
  baseSepolia,
} from "viem/chains";

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY || "cR4WnXePioePZ5fFrnSiR";

export const RPC_CHAIN_NAMES: Record<number, string> = {
  [mainnet.id]: "eth-mainnet",
  [sepolia.id]: "eth-sepolia",
  [optimism.id]: "opt-mainnet",
  [optimismSepolia.id]: "opt-sepolia",
  [arbitrum.id]: "arb-mainnet",
  [arbitrumSepolia.id]: "arb-sepolia",
  [polygon.id]: "polygon-mainnet",
  [polygonAmoy.id]: "polygon-amoy",
  [base.id]: "base-mainnet",
  [baseSepolia.id]: "base-sepolia",
};

export const getAlchemyHttpUrl = (chainId: number) => {
  return ALCHEMY_API_KEY && RPC_CHAIN_NAMES[chainId]
    ? `https://${RPC_CHAIN_NAMES[chainId]}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
    : undefined;
};
