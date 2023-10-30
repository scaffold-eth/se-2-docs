---
sidebar_position: 2
title: Write to contract with writeAsync button
description: Learn how to create a button that executes the writeAsync function to interact with a smart contract.
---

# Write to a Contract with writeAsync button

This recipe shows how to implement a button that allows users to interact with a smart contract by executing the `writeAsync` function. By following this guide, you can create a user interface for writing data to a contract.

## Before You Begin

Before you proceed with this recipe, make sure you have the [required dependencies installed](/quick-start/installation), and you're familiar with setting up your [Ethereum development environment](/quick-start/environment).

In this recipe you will use [useScaffoldContractWrite](/hooks/useScaffoldContractWrite) Scaffold ETH-2 hook, and [ParseEther viem utility](https://viem.sh/docs/utilities/parseEther.html#parseether). We recommend checking out the details of these hook and utility before start implementing this recipe.

## Implementation

### Step 1: Create Your Component

Start by creating a new component, which we'll call "Greetings.tsx." This component will enable users to write data to a smart contract.

Import the required libraries and components:

```tsx
import { useState } from "react";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
```

Define the functional component "Greetings" which will be used to create the user interface:

```tsx
const Greetings: NextPage = () => {
  // Your component code will go here.
};
```

### Step 2: Initialize Hooks for Contract Interaction

Initialize the `useScaffoldContractWrite` hook to set up the contract interaction. This hook provides the `writeAsync` function for sending transactions.

```tsx
const [newGreeting, setNewGreeting] = useState("");

const { writeAsync, isLoading } = useScaffoldContractWrite({
  contractName: "YourContract",
  functionName: "setGreeting",
  args: [newGreeting],
  value: parseEther("0.01"),
  onBlockConfirmation: txnReceipt => {
    console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  },
});
```

### Step 3: Create the User Interface with writeAsync Button

Design the user interface to allow users to input data and trigger the contract interaction. The example below demonstrates a simple form:

```tsx
return (
  <div className="p-8">
    <input
      type="text"
      placeholder="Write your greeting"
      className="input border border-primary"
      onChange={e => setNewGreeting(e.target.value)}
    />
    <div className="rounded-full mt-4">
      <button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
        Send
      </button>
    </div>
  </div>
);
```

:::info Hint
You can also create a writeAsync button sending args imperatively, here is an example:

```tsx
<button className="btn btn-primary" onClick={() => writeAsync({ args: ["Hello"], value: parseEther("0.02") })}>
  Send imperatively
</button>
```

:::info Hint

### Step 4: Test and Deploy

Test your component to ensure that it correctly interacts with the smart contract. You can verify if you are getting the same output as executing the Smart Contract `setGreeting` function directly from `Debug` tab.

## Conclusion

By following these steps, you've created a button that allows users to write data to a smart contract by clicking it.

## Full Recipe Code

<details>
  <summary>Here's the complete code for the "Greetings" component:</summary>

```tsx
import { useState } from "react";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Greetings: NextPage = () => {
  const [newGreeting, setNewGreeting] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: [newGreeting],
    value: parseEther("0.01"),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="p-8">
      <input
        type="text"
        placeholder="Write your greeting"
        className="input border border-primary"
        onChange={e => setNewGreeting(e.target.value)}
      />
      <div className="rounded-full mt-4">
        <button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};
export default Greetings;
```

</details>
