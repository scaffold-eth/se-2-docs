---
sidebar_position: 6
title: Read and Display Contract Events
description: Learn how to fetch and display smart contract events in your dApp.
---

# Read and Display Contract Events

This recipe shows how to fetch and display events emitted by your smart contract using the `useScaffoldEventHistory` hook. You'll learn how to efficiently query, parse, and render contract events in your UI, and see how to extend your project with production-grade event indexing using Subgraph or Ponder.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ContractEvents.tsx"
import * as React from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export const ContractEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    // fromBlock defaults to deployedOnBlock if available (block number of the contract deployment)
    watch: true,
    blockData: true,
  });

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;

  return (
    <div>
      <h2>GreetingChange Events</h2>
      <ul>
        {events?.map(event => (
          <li key={event.logIndex}>
            <p>Setter: {event.args?.greetingSetter}</p>
            <p>Greeting: {event.args?.newGreeting}</p>
            <p>Premium: {event.args?.premium}</p>
            <p>Value: {event.args?.value}</p>
            <p>Block: {event.block?.number?.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

</details>

## Implementation Guide

### Step 1: Create a Component

Create a new file, e.g., `components/ContractEvents.tsx`, in your project.

```tsx title="components/ContractEvents.tsx"
import * as React from "react";

export const ContractEvents = () => {
  return <div>Contract Events will be displayed here.</div>;
};
```

### Step 2: Use the `useScaffoldEventHistory` Hook

Import and use the `useScaffoldEventHistory` hook to fetch events. By default, the hook will start fetching from the block the contract was deployed (`deployedOnBlock`), so you don’t need to specify `fromBlock` unless you want to override it.

```tsx title="components/ContractEvents.tsx"
import * as React from "react";
// highlight-start
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
// highlight-end

export const ContractEvents = () => {
  // highlight-start
  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    // fromBlock defaults to deployedOnBlock if available (block number of the contract deployment)
    watch: true,
    blockData: true,
  });
  // highlight-end
  return <div>Contract Events will be displayed here.</div>;
};
```

### Step 3: Handle Loading and Error States

Show feedback to the user while events are loading or if an error occurs.

```tsx title="components/ContractEvents.tsx"
import * as React from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export const ContractEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    watch: true,
    blockData: true,
  });
  // highlight-start
  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;
  // highlight-end
  return <div>Contract Events will be displayed here.</div>;
};
```

### Step 4: Display the Events

Render the events in your UI. Adjust the argument names to match your contract's event signature.

```tsx title="components/ContractEvents.tsx"
import * as React from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export const ContractEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    watch: true,
    blockData: true,
  });
  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;
  // highlight-start
  return (
    <div>
      <h2>GreetingChange Events</h2>
      <ul>
        {events?.map(event => (
          <li key={event.logIndex}>
            <p>Setter: {event.args?.greetingSetter}</p>
            <p>Greeting: {event.args?.newGreeting}</p>
            <p>Premium: {event.args?.premium}</p>
            <p>Value: {event.args?.value}</p>
            <p>Block: {event.block?.number?.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  // highlight-end
};
```

## How `fromBlock` and `deployedOnBlock` Work

The `useScaffoldEventHistory` hook uses the `fromBlock` parameter to determine where to start fetching events from the blockchain.

- **Default behavior:**
  If you do not specify `fromBlock`, the hook will automatically start fetching events from the block where your contract was deployed. This block number is stored as `deployedOnBlock` in your deployed contracts metadata. This makes event queries more efficient, as it avoids scanning blocks before your contract existed.

- **Customizing `fromBlock`:**
  You can override this behavior by explicitly setting the `fromBlock` parameter in the hook options. For example, you might want to fetch events from a more recent block, or from the very beginning of the chain (`fromBlock: 0n`), depending on your use case.

**Example:**

```tsx title="components/ContractEvents.tsx"
useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "GreetingChange",
  fromBlock: 0n, // fetch from the genesis block (not recommended unless needed)
  watch: true,
  blockData: true,
});
```

## Displaying Event Arguments

The argument names (`greetingSetter`, `newGreeting`, `premium`, `value`, etc.) should match those defined in your contract’s event. Adjust them as needed for your use case.

## Next Steps

- **Subgraph (The Graph):** For advanced, production-grade event indexing and GraphQL querying, use the [Subgraph extension](https://github.com/scaffold-eth/create-eth-extensions/tree/subgraph). Install with:

  ```sh
  npx create-eth@latest -e subgraph
  ```

  See the extension docs for setup and deployment.

- **Ponder:** For a TypeScript-first, flexible event indexer suitable for both local development and production, use the [Ponder extension](https://github.com/scaffold-eth/create-eth-extensions/tree/ponder). Install with:
  ```sh
  npx create-eth@latest -e ponder
  ```
  See the extension docs for configuration and usage.

Both tools let you efficiently index and query contract events at scale. Choose the one that best fits your stack and workflow.
