---
sidebar_position: 2
title: Write to contract with writeAsync button
description: Learn how to create a button that executes the writeAsync function to interact with a smart contract.
---

# Write to a Contract with `writeAsync` button

This recipe shows how to implement a button that allows users to interact with a smart contract by executing the `writeAsync` function returned by [useScaffoldContractWrite](/hooks/useScaffoldContractWrite). By following this guide, you can create a user interface for writing data to a contract.

Here is the full code, which we will be implementing in the guide below:

```tsx title="components/Greetings.tsx"
import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Greetings = () => {
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
    <>
      <input
        type="text"
        placeholder="Write your greeting"
        className="input border border-primary"
        onChange={e => setNewGreeting(e.target.value)}
      />
      <button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Send</>}
      </button>
    </>
  );
};
```

## Implementation

### Step 1: Set Up Your Component

Create a new component in the "components" folder. This component will enable users to write data to a smart contract.

```tsx title="components/Greetings.tsx"
export const Greetings = () => {
  return (
    <>
      <input type="text" placeholder="Write your greeting" className="input border border-primary" />
      <button>Send</button>
    </>
  );
};
```

### Step 2: Initialize `useScaffoldContractWrite` hook

Initialize the `useScaffoldContractWrite` hook to set up the contract interaction. This hook provides the `writeAsync` function for sending transactions.

```tsx
// highlight-start
import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
// highlight-end

export const Greetings = () => {
  // highlight-start
  const [newGreeting, setNewGreeting] = useState("");

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: [newGreeting],
    value: parseEther("0.01"),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  // highlight-end
  return (
    <>
      <input type="text" placeholder="Write your greeting" className="input border border-primary" />
      <button>Send</button>
    </>
  );
};
```

### Step 3: Add input change logic and send transaction when users click the button

Design the user interface to allow users to input data and trigger the contract interaction. The example below demonstrates a simple form:

```tsx
import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Greetings = () => {
  const [newGreeting, setNewGreeting] = useState("");

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: [newGreeting],
    value: parseEther("0.01"),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <>
      <input
        type="text"
        placeholder="Write your greeting"
        className="input border border-primary"
        // highlight-start
        onChange={e => setNewGreeting(e.target.value)}
        // highlight-end
      />
      <button
        className="btn btn-primary"
        // highlight-start
        onClick={() => writeAsync()}
        // highlight-end
      >
        Send
      </button>
    </>
  );
};
```

### Step 4: Bonus adding loading state

We can use `isLoading` returned from `useScaffoldContractWrite` while the transaction is being mined and also disable the button.

```tsx
import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Greetings = () => {
  const [newGreeting, setNewGreeting] = useState("");
  // highlight-start
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    // highlight-end
    contractName: "YourContract",
    functionName: "setGreeting",
    args: [newGreeting],
    value: parseEther("0.01"),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <>
      <input
        type="text"
        placeholder="Write your greeting"
        className="input border border-primary"
        onChange={e => setNewGreeting(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={() => writeAsync()}
        // highlight-start
        disabled={isLoading}
      >
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Send</>}
      </button>
    </>
    // highlight-end
  );
};
```

:::info Hint
You can also create a writeAsync button sending args imperatively, here is an example:

```tsx
<button className="btn btn-primary" onClick={() => writeAsync({ args: ["Hello"], value: parseEther("0.02") })}>
  Send imperatively
</button>
```

:::info Hint
