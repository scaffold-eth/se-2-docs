---
sidebar_position: 3
title: Wait for TxReceipt to send next transaction
description: Learn how to wait for TxReceipt before sending a new transaction in a multi-step process.
---

# Wait for Transaction Receipt to Send a Second Transaction

This recipe shows how to create a multi-step transaction process where you wait for the receipt of the first transaction before sending a second transaction.

Here is the full code, which we will be implementing in the guide below:

```tsx title="components/SellNFT.tsx"
import { useState } from "react";
import { parseEther } from "viem";
import { erc721ABI, useContractWrite, usePublicClient } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { AddressInput, InputBase } from "~~/components/scaffold-eth/Input";

export const SellNFT = () => {
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
```

## Implementation

### Step 1: Set Up Your Component

Create a new component in the "components" folder. This component will allow users to perform a multi-step `ERC721` approve+listing process for selling a NFT, similar to the `ERC20` approve pattern.

```tsx title="components/SellNFT.tsx"
export const SellNFT = () => {
  return (
    <div>
      <h2 className="p-8 text-xl font-bold">Sell Your NFT</h2>
      <div className="flex w-1/3">
        <form className="w-full pl-8">
          <div className="mb-3">
            <label>NFT Address</label>
          </div>
          <div className="mb-3">
            <label>NFT Token ID</label>
          </div>
          <div className="mb-3">
            <label>Price (eth)</label>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

### Step 2: Initialize Hooks for Contract Interaction

Initialize the necessary hooks for interacting with the smart contract. In this recipe, we're using:

- [usePublicClient](https://wagmi.sh/react/hooks/usePublicClient) and [useContractWrite](https://wagmi.sh/react/hooks/useContractWrite) from wagmi.
- [useScaffoldContractWrite](/hooks/useScaffoldContractWrite) and [useDeployedContractInfo](/hooks/useDeployedContractInfo) Scaffold ETH-2 hooks.

```tsx
// highlight-start
import { useState } from "react";
import { parseEther } from "viem";
import { erc721ABI, useContractWrite, usePublicClient } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const SellNFT = () => {
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
  // highlight-end
  return (
    <div>
      <h2 className="p-8 text-xl font-bold">Sell Your NFT</h2>
      <div className="flex w-1/3">
        <form className="w-full pl-8">
          <div className="mb-3">
            <label>NFT Address</label>
          </div>
          <div className="mb-3">
            <label>NFT Token ID</label>
          </div>
          <div className="mb-3">
            <label>Price (eth)</label>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

### Step 3: Add all the inputs and submit logic to your form

Create `handleSubmit` logic with the multi-step listing process, waiting for the approval transaction receipt in order to list the NFT. Once you're done with the logic, call it when users submit the form.

Add the inputs to your form, using [AddressInput](/components/AddressInput) and [InputBase](/components/InputBase) Scaffold ETH-2 components.

```tsx
import { useState } from "react";
import { parseEther } from "viem";
import { erc721ABI, useContractWrite, usePublicClient } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
// highlight-start
import { AddressInput, InputBase } from "~~/components/scaffold-eth/Input";
// highlight-end

export const SellNFT = () => {
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

  // highlight-start
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const approveHash = await approveTx?.writeAsync();
  await publicClient.waitForTransactionReceipt(approveHash);
  await listNftTx?.writeAsync();
};
// highlight-end

return (
  <div>
    <h2 className="p-8 text-xl font-bold">Sell Your NFT</h2>
    <div className="flex w-1/3">
      <form className="w-full pl-8"
      // highlight-start
      onSubmit={handleSubmit}>
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
  // highlight-end
);
```
