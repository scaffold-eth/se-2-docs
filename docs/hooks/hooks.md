---
sidebar_position: 4
---

# 🛠 Interacting with Your Smart Contracts

Scaffold-ETH 2 provides a collection of custom React hooks designed to simplify interactions with your deployed smart contracts. These hooks are wrappers around Wagmi, an easy-to-use interface with typescript autocompletions for reading from, writing to, and monitoring events emitted by your smart contracts.

If you need to interact with external contracts (i.e. not deployed with your SE-2 instance) you can add external contract data to your `packages/nextjs/contracts/externalContracts.ts` file, which would let you use Scaffold-ETH 2 hooks.

To achieve this, include the contract name, its `address`, and `abi` in `externalContracts.ts` for each chain ID. Ensure to update the [`targetNetworks`](/deploying/deploy-nextjs-app#--targetnetworks) in `scaffold.config.ts` to your preferred chains to enable hooks typescript autocompletion.

This is the structure of `externalContracts` object:

```ts
const externalContracts = {
  1: {
    DAI: {
      address: "0x...",
      abi: [...],
    },
    WETH: {
      address: "0x...",
      abi: [...],
    },
  },
  5: {
    DAI: {
      address: "0x...",
      abi: [...],
    },
    WETH: {
      address: "0x...",
      abi: [...],
    },
  },
} as const;
```

:::note

When having multiple chains configured in [`targetNetworks`](/deploying/deploy-nextjs-app#--targetnetworks), make sure to have same contractName's on other chains as `targetNetworks[0].id`.This ensures proper functionality and autocompletion of custom hooks, as the current setup and types assumes that same contract's are present on other chains as `targetNetworks[0]`.

:::
