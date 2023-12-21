---
sidebar_position: 4
title: Wagmi useContractWrite with transaction status
description: Show feedback on transaction status to user by `useContractWrite` along with `useTransactor`
---

# Wagmi `useContractWrite` with transaction status

This recipe demonstrates how to create a button for contract interaction using the "useTransactor" and "useContractWrite" hooks from the "wagmi" library. The interaction includes the capability provides feedback on the transaction status when using wagmi `useContractWrite`.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ContractInteraction.tsx"
import * as React from "react";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const writeTx = useTransactor();

  const { writeAsync } = useContractWrite({
    address: DeployedContracts[31337].YourContract.address,
    abi: DeployedContracts[31337].YourContract.abi,
    functionName: "setGreeting",
    value: parseEther("0.01"),
    args: ["Hello world!"],
  });

  const handleSetGreeting = async () => {
    try {
      await writeTx(writeAsync, { blockConfirmations: 1 });
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleSetGreeting} disabled={isLoading}>
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
        </>
      )}
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

### Step 2: Configure wagmi's `useContractWrite` hook

Add wagmi's `useContractWrite` hook and configure it with `abi`, `address`, `functionName` etc. Get the ABI and address of your smart contract from the DeployedContracts or you can grab it from ExternalContracts object, those will be used to set up the contract interaction.

```tsx
import * as React from "react";
// highlight-start
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
// highlight-end

export const ContractInteraction = () => {
  // highlight-start
  const { writeAsync } = useContractWrite({
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

Initialize the `useTransactor` hook, and use it to wrap `writeAsync` function which we got from `useContractWrite` to show feedback transaction status to user.

```tsx
import * as React from "react";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
// highlight-start
import { useTransactor } from "~~/hooks/scaffold-eth";
// highlight-end

export const ContractInteraction = () => {
  const { writeAsync } = useContractWrite({
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
  return <button onClick={() => writeTx(writeAsync, { blockConfirmations: 1 })}>Send</button>;
  // highlight-end
};
```

### Step 4: Bonus adding loading state

We can use `isLoading` returned from `useContractWrite` while the transaction is being mined and also `disable` the button.

```tsx
import * as React from "react";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  // highlight-start
  const { writeAsync, isLoading } = useContractWrite({
    // highlight-end
    address: DeployedContracts[31337].YourContract.address,
    abi: DeployedContracts[31337].YourContract.abi,
    functionName: "setGreeting",
    value: parseEther("0.01"),
    args: ["Hello world!"],
  });

  const writeTx = useTransactor();

  return (
    // highlight-start
    <button onClick={() => writeTx(writeAsync, { blockConfirmations: 1 })} disabled={isLoading}>
      {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Send</>}
    </button>
    // highlight-end
  );
};
```
