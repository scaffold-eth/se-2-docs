---
sidebar_position: 3
title: Read a uint from a contract
description: Learn how to read from contract functions which accepts arguments / no arguments and display them on UI.
---

# Read a `uint` from a contract

This recipe demonstrates how to read data from contract functions and display it on the UI. We'll showcase an example that accepts some arguments (parameters), and another with no arguments at all.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/GreetingsCount.tsx"
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const GreetingsCount = () => {
  const { address: connectedAddress } = useAccount();

  const { data: totalCounter, isLoading: isTotalCounterLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  const { data: connectedAddressCounter, isLoading: isConnectedAddressCounterLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "userGreetingCounter",
    args: [connectedAddress], // passing args to function
  });

  return (
    <div className="card card-compact w-64 bg-secondary text-primary-content shadow-xl m-4">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Greetings Count</h2>
        <div className="card-actions items-center flex-col gap-1 text-lg">
          <h2 className="font-bold m-0">Total Greetings count:</h2>
          {isTotalCounterLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p className="m-0">{totalCounter ? totalCounter.toString() : 0}</p>
          )}
          <h2 className="font-bold m-0">Your Greetings count:</h2>
          {isConnectedAddressCounterLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p className="m-0">{connectedAddressCounter ? connectedAddressCounter.toString() : 0}</p>
          )}
        </div>
      </div>
    </div>
  );
};
```

</details>

## Implementation guide

### Step 1: Create a new Component

Begin by creating a new component in the "components" folder of your application.

```tsx title="components/GreetingsCount.tsx"
export const GreetingsCount = () => {
  return (
    <div>
      <h2 className="font-bold m-0">Total Greetings count:</h2>
      <h2 className="font-bold m-0">Your Greetings count:</h2>
    </div>
  );
};
```

### Step 2: Retrieve total greetings count

Initialize the [useScaffoldReadContract](/hooks/useScaffoldReadContract) hook to read from the contract. This hook provides the `data` which contains the return value of the function.

```tsx title="components/GreetingsCount.tsx"
//highlight-start
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// highlight-end

export const GreetingsCount = () => {
  // highlight-start
  const { data: totalCounter } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "totalCounter",
  });
  // highlight-end

  return (
    <div>
      <h2 className="font-bold m-0">Total Greetings count:</h2>
      //highlight-start
      <p>{totalCounter ? totalCounter.toString() : 0}</p>
      //highlight-end
      <h2 className="font-bold m-0">Your Greetings count:</h2>
    </div>
  );
};
```

In the line `const {data: totalCounter} = useScaffoldReadContract({...})` we are using [destructuring asssignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to assign `data` to a new name `totalCounter`.

In the contract, `totalCounter` returns an `uint` value, which is represented as a [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) in javascript and can be converted to a readable string using `.toString()`.

### Step 3: Retrieve connected address greetings count

We can get the connected address using the [useAccount](https://wagmi.sh/react/api/hooks/useAccount) hook and pass it to `args` key in the `useScaffoldReadContract` hook configuration. This will be used as an argument to read the contract function.

```tsx title="components/GreetingsCount.tsx"
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
//highlight-start
import { useAccount } from "wagmi";
//highlight-end

export const GreetingsCount = () => {
  //highlight-start
  const { address: connectedAddress } = useAccount();
  //highlight-end

  const { data: totalCounter } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  //highlight-start
  const { data: connectedAddressCounter } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "userGreetingCounter",
    args: [connectedAddress], // passing args to function
  });
  //highlight-end

  return (
    <div>
      <h2>Total Greetings count:</h2>
      <p>{totalCounter ? totalCounter.toString() : 0}</p>
      <h2>Your Greetings count:</h2>
      //highlight-start
      <p>{connectedAddressCounter ? connectedAddressCounter.toString() : 0}</p>
      //highlight-end
    </div>
  );
};
```

### Step 4: Bonus adding loading state

We can use `isLoading` returned from the [`useScaffoldReadContract`](/hooks/usescaffoldreadcontract) hook. This variable is set to `true` while fetching data from the contract.

```tsx title="components/GreetingsCount.tsx"
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

export const GreetingsCount = () => {
  const { address: connectedAddress } = useAccount();

  // highlight-start
  const { data: totalCounter, isLoading: isTotalCounterLoading } = useScaffoldReadContract({
    // highlight-end
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  // highlight-start
  const { data: connectedAddressCounter, isLoading: isConnectedAddressCounterLoading } = useScaffoldReadContract({
    // highlight-end
    contractName: "YourContract",
    functionName: "userGreetingCounter",
    args: [connectedAddress], // passing args to function
  });

  return (
    <div>
      <h2>Total Greetings count:</h2>
      // highlight-start
      {isTotalCounterLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <p className="m-0">{totalCounter ? totalCounter.toString() : 0}</p>
      )}
      // highlight-end
      <h2>Your Greetings count:</h2>
      // highlight-start
      {isConnectedAddressCounterLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <p className="m-0">{connectedAddressCounter ? connectedAddressCounter.toString() : 0}</p>
      )}
      // highlight-end
    </div>
  );
};
```
