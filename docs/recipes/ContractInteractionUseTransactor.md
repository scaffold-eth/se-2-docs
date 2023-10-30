---
sidebar_position: 4
title: Contract Interaction with useTransactor and useContractWrite
description: Contract Interaction with useTransactor and useContractWrite
---

# Contract Interaction with useTransactor and useContractWrite

This recipe demonstrates how to create a button for contract interaction using the "useTransactor" and "useContractWrite" hooks from the "wagmi" library. The interaction includes the capability to pass dynamic arguments and provides feedback on the transaction status.

## Before You Begin

Before you proceed with this recipe, make sure you have the [required dependencies installed](/quick-start/installation), and you're familiar with setting up your [Ethereum development environment](/quick-start/environment).

This recipe uses [useTransactor](https://wagmi.sh/react/hooks/useAccount) and [useContractWrite](https://wagmi.sh/react/hooks/useAccount) wagmi hooks, and [ParseEther viem utility](https://viem.sh/docs/utilities/parseEther.html#parseether). You can check the details of these hooks and util to acquire more context before implementing this recipe.

## Implementation

### Step 1: Set Up Your Component

Create a new component in the "components" folder called "ContractInteraction.tsx". The component will show a button that will allow users to interact with your smart contract.

Import the necessary libraries and components, adding the following code to the file:

```tsx
import \* as React from "react";
import { useTransactor, useContractWrite } from "wagmi";
import { parseEther } from "viem";
import DeployedContracts from "~~/generated/deployedContracts";

```

Define your functional component, which we'll call ContractInteraction. This component will be exported and used in your application.

```tsx
export const ContractInteraction = () => {
  // Your component code will go here.
};
```

### Step 2: Configure the Smart Contract Information

Get the ABI and address of your smart contract from the DeployedContracts object, those will be used to set up the contract interaction. Replace 'YourContract' with the actual contract name, and '31337' with the correct network ID.

```tsx
const yourContractAbi = DeployedContracts[31337][0].contracts.YourContract.abi;
const yourContractAddress = DeployedContracts[31337][0].contracts.YourContract.address;
```

### Step 3: Initialize Hooks for Contract Interaction

Initialize the `useTransactor` hook, which will be used for sending transactions.

```tsx
const writeTx = useTransactor();
```

Use the `useContractWrite` hook to set up the contract interaction.

```tsx
const { writeAsync, isLoading } = useContractWrite({
  address: yourContractAddress,
  abi: yourContractAbi,
  functionName: "setGreeting",
  value: parseEther("0.01"),
  args: ["Hello world!"],
});
```

### Step 4: Create the Interaction Function

Define the function `handleSetGreeting` to handle the contract interaction.

```tsx
const handleSetGreeting = async () => {
  try {
    await writeTx(writeAsync, { blockConfirmations: 1 });
  } catch (e) {
    console.log("Unexpected error in writeTx", e);
  }
};
```

### Step 5: Render the User Interface

Create the button that allows users to trigger the contract interaction.

```tsx
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
```

### Step 6: Add to Your Application

Import the `ContractInteraction` component into your application and include it where you want users to interact with the smart contract.

```tsx
import { ContractInteraction } from "./ContractInteraction";

// Include the ContractInteraction component in your application.
```

### Step 7: Test and Deploy

Test your contract interaction functionality to ensure it works as expected. You can verify if you are getting the same output as executing the Smart Contract `setGreeting` function directly from `Debug` tab.

## Conclusion

By following these steps, you've created a button that allows users to interact with your smart contract. Users can set the greeting message in this example, but you can customize it to suit your contract's specific functionality.

## Full recipe code

<details>
  <summary>Here's the complete code for the "ContractInteraction" component:</summary>

```tsx
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import DeployedContracts from "~~/generated/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const yourContractAbi = DeployedContracts[31337][0].contracts.YourContract.abi;
  const yourContractAddress = DeployedContracts[31337][0].contracts.YourContract.address;

  const writeTx = useTransactor();

  const { writeAsync, isLoading } = useContractWrite({
    address: yourContractAddress,
    abi: yourContractAbi,
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
