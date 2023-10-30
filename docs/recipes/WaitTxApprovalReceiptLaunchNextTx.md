---
sidebar_position: 3
title: Wait for Transaction Approval Receipt before launching next Transaction
description: Learn how to wait for a transaction receipt before sending a second transaction in a multi-step process.
---

# Wait for Transaction Receipt to Send a Second Transaction

This recipe shows how to create a multi-step transaction process where you wait for the receipt of the first transaction before sending a second transaction.

## Before You Begin

Before you proceed with this recipe, make sure you have the [required dependencies installed](/quick-start/installation), and you're familiar with setting up your [Ethereum development environment](/quick-start/environment).

In this recipe you will use a few hooks:

- [usePublicClient](https://wagmi.sh/react/hooks/usePublicClient) and [useContractWrite](https://wagmi.sh/react/hooks/useContractWrite) from wagmi
- [useScaffoldContractWrite](/hooks/useScaffoldContractWrite) and [useDeployedContractInfo](/hooks/useDeployedContractInfo) Scaffold ETH-2 hooks.

You'll also use [AddressInput](/components/AddressInput) and [InputBase](/components/InputBase) Scaffold ETH-2 components, [ParseEther viem utility](https://viem.sh/docs/utilities/parseEther.html#parseether) and erc721ABI from wagmi. We recommend checking out the details of these hooks, components and utils before start implementing this recipe.

## Implementation

### Step 1: Create Your Component

Begin by creating a new component, which we'll name "SellNFT.tsx". This component will allow users to perform a multi-step ERC721 approve+listing process for selling a NFT, similar to the ERC20 approve pattern.

Import the necessary libraries and components:

```tsx
import { useState } from "react";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { erc721ABI, useContractWrite, usePublicClient } from "wagmi";
import { AddressInput, InputBase } from "~~/components/scaffold-eth/Input";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
```

Define the functional component "SellNFT" which will be used to create the user interface for the multi-step transaction process:

```tsx
const SellNFT: NextPage = () => {
  // Your component code will go here.
};
```

### Step 2: Initialize Hooks for Contract Interaction

Initialize the necessary hooks for interacting with the smart contract. In this example, we'll use two hooks: `useContractWrite` and `useScaffoldContractWrite`.

```tsx
const [address, setAddress] = useState("");
const [tokenId, setTokenId] = useState("");
const [price, setPrice] = useState("");

const publicClient = usePublicClient();

const { data: NftMarketplace } = useDeployedContractInfo("NftMarketplace");

const approveTx = useContractWrite({
  address: address,
  abi: erc721ABI,
  functionName: "approve",
  args: [NftMarketplace?.address as string, BigInt(tokenId)],
});

const listNftTx = useScaffoldContractWrite({
  contractName: "NftMarketplace",
  functionName: "listItem",
  args: [address, BigInt(tokenId), parseEther(price)],
});
```

### Step 3: Create the Multi-Step Transaction Process

Design the user interface to allow users to perform a multi-step transaction process. In this example, we've created a form for selling a NFT:

```tsx
return (
  <div>
    <h2 className="p-8 text-xl font-bold">Sell Your NFT</h2>
    <div className="flex w-1/3">
      <form className="w-full pl-8" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>NFT Address</label>
          <AddressInput value={address} onChange={val => setAddress(val)} />
        </div>
        <div className="mb-3">
          <label>NFT Token ID</label>
          <InputBase value={tokenId} onChange={val => setTokenId(val)} />
        </div>
        <div className="mb-3">
          <label>Price (ETH)</label>
          <InputBase value={price} onChange={val => setPrice(val)} />
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
);
```

### Step 4: Implement Multi-Step Transaction Logic

Add logic to handle the multi-step transaction process. In this example, we submit the first transaction to approve the marketplace contract address to transfer our NFT. Then we wait for its receipt before proceeding to list the NFT for sale:

```tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const approveHash = await approveTx?.writeAsync();
  await publicClient.waitForTransactionReceipt(approveHash);
  await listNftTx?.writeAsync();
};
```

### Step 5: Test and Deploy

Test your multi-step transaction process to ensure that it correctly waits for the receipt of the first transaction before proceeding with the second.

## Conclusion

By following these steps, you've created a multi-step transaction process that waits for the receipt of the first transaction before sending the second. This behaviour will be useful for many different types of smart contract interactions, like approving a contract to spend your tokens, or approving a contract to transfer your NFTs.

## Full Recipe Code

<details>
  <summary>Here's the complete code for the "SellNFT" component:</summary>

```tsx
import { useState } from "react";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { erc721ABI, useContractWrite, usePublicClient } from "wagmi";
import { AddressInput, InputBase } from "~~/components/scaffold-eth/Input";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const SellNFT: NextPage = () => {
  const [address, setAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");

  const publicClient = usePublicClient();

  const { data: NftMarketplace } = useDeployedContractInfo("NftMarketplace");

  const approveTx = useContractWrite({
    address: address,
    abi: erc721ABI,
    functionName: "approve",
    args: [NftMarketplace?.address as string, BigInt(tokenId)],
  });

  const listNftTx = useScaffoldContractWrite({
    contractName: "NftMarketplace",
    functionName: "listItem",
    args: [address, BigInt(tokenId), parseEther(price)],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const approveHash = await approveTx?.writeAsync();
    await publicClient.waitForTransactionReceipt(approveHash);
    await listNftTx?.writeAsync();
  };

  return (
    <div>
      <h2 className="p-8 text-xl font-bold">Sell Your NFT</h2>
      <div className="flex w-1/3">
        <form className="w-full pl-8" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>NFT Address</label>
            <AddressInput value={address} onChange={val => setAddress(val)} />
          </div>
          <div className="mb-3">
            <label>NFT Token ID</label>
            <InputBase value={tokenId} onChange={val => setTokenId(val)} />
          </div>
          <div className="mb-3">
            <label>Price (eth)</label>
            <InputBase value={price} onChange={val => setPrice(val)} />
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellNFT;
```

</details>
