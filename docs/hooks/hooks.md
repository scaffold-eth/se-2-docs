---
sidebar_position: 4
---

# 🛠 Interacting with your Smart Contracts

Scaffold-ETH 2 provides a collection of custom React hooks designed to simplify interactions with your deployed smart contracts. These hooks are wrappers around Wagmi, an easy-to-use interface with typescript autocompletions for reading from, writing to, and monitoring events emitted by your smart contracts.

If you need to interact with external contracts (i.e. not deployed with your SE-2 instance) you can add external contract data to your `packages/nextjs/contracts/externalContracts.ts` file, which would let you use Scaffold-ETH 2 hooks.

To do that, you will have to add the contract `address` and `abi` for every contract you define in your `externalContracts.ts` file. Need to register this info for all the different network IDs where you want to use them. You will have to change the `targetNetwork` of your `scaffold.config.ts` file to your desired network to be able to use the hooks with autocompletion.

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
  5: {
    DAI: {
      address: "0x...",
      abi: [...],
    },
    USDT: {
      address: "0x...",
      abi: [...],
    },
} as const;
```
