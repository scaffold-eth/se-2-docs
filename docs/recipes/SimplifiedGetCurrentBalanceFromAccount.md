---
sidebar_position: 1
title: Simplified Get balance of the connected account
description: Learn how to retrieve and display the ETH balance of the connected account in your dApp.
---

# Get the Current Balance of the Connected Account

This recipe shows how to fetch and display the ETH balance of the currently connected account in your decentralized application. After the recipe code, you'll find an implementation guide that walks you through the steps of creating this recipe yourself.

```tsx
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";

const ConnectedAddressBalance: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="bg-base-300 p-6 rounded-lg max-w-md mx-auto mt-6">
      <h2 className="text-lg font-bold mb-2">Your Ethereum Balance</h2>

      <div className="text-sm font-semibold mb-2">
        Address: <Address address={connectedAddress} />
      </div>

      <div className="text-sm font-semibold">
        Balance: <Balance address={connectedAddress} />
      </div>
    </div>
  );
};

export default ConnectedAddressBalance;
```

## Implementation guide

### Step 1: Create a new Component

Begin by creating a new component in the "components" folder of your application. In our recipe we'll call it "ConnectedAddressBalance.tsx".

Import the required libraries and components:

```tsx
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";
```

Define your functional component, which we'll call "ConnectedAddressBalance". This component will be used to display the connected account and its ETH balance.

```tsx
const ConnectedAddressBalance: NextPage = () => {
  // Your component code will go here.
};
```

### Step 2: Retrieve the Connected Account

Fetch the Ethereum address of the currently connected account using the [useAccount wagmi hook](https://wagmi.sh/react/hooks/useAccount).

```tsx
const { address: connectedAddress } = useAccount();
```

### Step 3: Create the User Interface

Build the user interface to display the address and its current ETH balance. Here is an example with very basic styling:

```tsx
return (
  <div className="bg-base-300 p-6 rounded-lg max-w-md mx-auto mt-6">
    <h2 className="text-lg font-bold mb-2">Your Ethereum Balance</h2>

    <div className="text-sm font-semibold mb-2">
      Address: <Address address={connectedAddress} />
    </div>

    <div className="text-sm font-semibold">
      Balance: <Balance address={connectedAddress} />
    </div>
  </div>
);
```

:::info Hint
You can extend this component to display the balance of any other address by passing the address as a prop to the `Balance` component.
:::info Hint
