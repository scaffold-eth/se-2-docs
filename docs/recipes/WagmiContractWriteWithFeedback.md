---
sidebar_position: 4
title: Wagmi useWriteContract with transaction status
description: Show feedback on transaction status to user by `useWriteContract` along with `useTransactor`
---

# Wagmi `useWriteContract` with transaction status

This recipe demonstrates how to create a button for contract interaction using the "useTransactor" and "useWriteContract" hooks from the "wagmi" library. The interaction includes the capability to provide feedback on the transaction status when using wagmi `useWriteContract`.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ContractInteraction.tsx"
import * as React from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const { writeContractAsync, isPending } = useWriteContract();

  const writeContractAsyncWithParams = () =>
    writeContractAsync({
      address: DeployedContracts[31337].YourContract.address,
      abi: DeployedContracts[31337].YourContract.abi,
      functionName: "setGreeting",
      value: parseEther("0.01"),
      args: ["Hello world!"],
    });

  const writeTx = useTransactor();

  const handleSetGreeting = async () => {
    try {
      await writeTx(writeContractAsyncWithParams, { blockConfirmations: 1 });
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleSetGreeting} disabled={isPending}>
      {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
    </button>
  );
};
```

</details>

## Implementation

### Step 1: Set Up Your Component

Create a new component in the "components" folder. The component will show a button that will allow users to interact with your smart contract.

```tsx title="components/ContractInteraction.tsx"
import * as React from "react";

export const ContractInteraction = () => {
  return <button>Send</button>;
};
```

### Step 2: Configure wagmi's `useWriteContract` hook

Add wagmi's `useWriteContract` hook and configure `writeContractAsync` with the parameters: `abi`, `address`, `functionName`, `value` and `args`. Get the ABI and address of your smart contract from the DeployedContracts or you can grab it from ExternalContracts object, those will be used to set up the contract interaction.

```tsx
import * as React from "react";
// highlight-start
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
// highlight-end

export const ContractInteraction = () => {
  // highlight-start
  const { writeContractAsync } = useWriteContract();

  const writeContractAsyncWithParams = () =>
    writeContractAsync({
      address: DeployedContracts[31337].YourContract.address,
      abi: DeployedContracts[31337].YourContract.abi,
      functionName: "setGreeting",
      value: parseEther("0.01"),
      args: ["Hello world!"],
    });
  // highlight-end
  return <button>Send</button>;
};
```

### Step 3: Initialize `useTransactor` hook and send transaction

Initialize the `useTransactor` hook, and use it to wrap `writeContractAsyncWithParams` function which we got from `useWriteContract` to show feedback transaction status to user.

```tsx
import * as React from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
// highlight-start
import { useTransactor } from "~~/hooks/scaffold-eth";
// highlight-end

export const ContractInteraction = () => {
  const { writeContractAsync } = useWriteContract();

  const writeContractAsyncWithParams = () =>
    writeContractAsync({
      address: DeployedContracts[31337].YourContract.address,
      abi: DeployedContracts[31337].YourContract.abi,
      functionName: "setGreeting",
      value: parseEther("0.01"),
      args: ["Hello world!"],
    });

  // highlight-start
  const writeTx = useTransactor();
  // highlight-end

  // highlight-start
  return <button onClick={() => writeTx(writeContractAsyncWithParams, { blockConfirmations: 1 })}>Send</button>;
  // highlight-end
};
```

### Step 4: Wrap `useTransactor` in a handler async function

Wrap the `writeTx` function in a handler function to start the transaction when the user clicks the button.

```tsx
import * as React from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const { writeContractAsync, isPending } = useWriteContract();

  const writeContractAsyncWithParams = () =>
  writeContractAsync({
    address: DeployedContracts[31337].YourContract.address,
    abi: DeployedContracts[31337].YourContract.abi,
    functionName: "setGreeting",
    value: parseEther("0.01"),
    args: ["Hello world!"],
  });

  const writeTx = useTransactor();

  // highlight-start
  const handleSetGreeting = async () => {
    try {
      await writeTx(writeContractAsyncWithParams, { blockConfirmations: 1 });
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };
  // highlight-end


  return (
    // highlight-start
    <button className="btn btn-primary" onClick={handleSetGreeting}>
      Send
    </button>
    // highlight-end
  );

```

### Step 5: Bonus adding loading state

We can use `isPending` returned from `useWriteContract` while the transaction is being mined and also `disable` the button.

```tsx
import * as React from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  // highlight-start
  const { writeContractAsync, isPending } = useWriteContract();
  // highlight-end

  const writeContractAsyncWithParams = () =>
    writeContractAsync({
      address: DeployedContracts[31337].YourContract.address,
      abi: DeployedContracts[31337].YourContract.abi,
      functionName: "setGreeting",
      value: parseEther("0.01"),
      args: ["Hello world!"],
    });

  const writeTx = useTransactor();

  const handleSetGreeting = async () => {
    try {
      await writeTx(writeContractAsyncWithParams, { blockConfirmations: 1 });
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  return (
    // highlight-start
    <button className="btn btn-primary" onClick={handleSetGreeting} disabled={isPending}>
      {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
    </button>
    // highlight-end
  );
};
```
