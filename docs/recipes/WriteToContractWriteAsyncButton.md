---
sidebar_position: 2
title: Write to contract with writeContractAsync button
description: Learn how to create a button that executes the writeContractAsync function to interact with a smart contract.
---

# Write to a Contract with `writeContractAsync` button

This recipe shows how to implement a button that allows users to interact with a smart contract by executing the `writeContractAsync` function returned by [useScaffoldWriteContract](/hooks/useScaffoldWriteContract). By following this guide, you can create a user interface for writing data to a contract.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/Greetings.tsx"
import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const Greetings = () => {
  const [newGreeting, setNewGreeting] = useState("");

  const { writeContractAsync, isPending } = useScaffoldWriteContract("YourContract");

  const handleSetGreeting = async () => {
    try {
      await writeContractAsync(
        {
          functionName: "setGreeting",
          args: [newGreeting],
          value: parseEther("0.01"),
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Write your greeting"
        className="input border border-primary"
        onChange={e => setNewGreeting(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSetGreeting} disabled={isPending}>
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
      </button>
    </>
  );
};
```

</details>

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

### Step 2: Initialize `useScaffoldWriteContract` hook

Initialize the `useScaffoldWriteContract` hook. This hook provides the `writeContractAsync` function for sending transactions, we'll create `handleSetGreeting` function in which we'll call and pass parameters to `writeContractAsync` required to perform contract interaction.

```tsx
// highlight-start
import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// highlight-end

export const Greetings = () => {
  // highlight-start
  const [newGreeting, setNewGreeting] = useState("");
  // highlight-end

  // highlight-start
  const { writeContractAsync } = useScaffoldWriteContract("YourContract");
  // highlight-end

  // highlight-start
  const handleSetGreeting = async () => {
    try {
      await writeContractAsync(
        {
          functionName: "setGreeting",
          args: [newGreeting],
          value: parseEther("0.01"),
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }
  };
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

Wire up the input field to update the `newGreeting` state when the user types in a new greeting and call `handleSetGreeting` function when user click on the button.

```tsx
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const Greetings = () => {
  const [newGreeting, setNewGreeting] = useState("");

  const { writeContractAsync } = useScaffoldWriteContract("YourContract");

  const handleSetGreeting = async () => {
    try {
      await writeContractAsync(
        {
          functionName: "setGreeting",
          args: [newGreeting],
          value: parseEther("0.01"),
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }
  };

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
        onClick={handleSetGreeting}
        // highlight-end
      >
        Send
      </button>
    </>
  );
};
```

### Step 4: Bonus adding loading state

We can use `isPending` returned from `useScaffoldWriteContract` while the transaction is being mined and also disable the button.

```tsx
import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const Greetings = () => {
  const [newGreeting, setNewGreeting] = useState("");
  // highlight-start
  const { writeContractAsync, isPending } = useScaffoldWriteContract("YourContract");
  // highlight-end

  const handleSetGreeting = async () => {
    try {
      await writeContractAsync(
        {
          functionName: "setGreeting",
          args: [newGreeting],
          value: parseEther("0.01"),
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }
  };

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
        onClick={handleSetGreeting}
        // highlight-start
        disabled={isPending}
      >
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
      </button>
    </>
    // highlight-end
  );
};
```
