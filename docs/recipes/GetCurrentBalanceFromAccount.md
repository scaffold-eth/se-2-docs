---
sidebar_position: 1
title: Get balance of the connected account
description: Learn how to retrieve and display the ETH balance of the connected account in your dApp.
---

# Get the Current Balance of the Connected Account

This recipe guides you on how to fetch and display the ETH balance of the currently connected account in your decentralized application. To achieve this, we'll use the [wagmi](https://wagmi.sh) library, which provides essential hooks for interacting with Ethereum.

## Before You Begin

Before you proceed with this recipe, make sure you have the [required dependencies installed](/quick-start/installation), and you're familiar with setting up your [Ethereum development environment](/quick-start/environment).

This recipe mainly uses [Address](/components/Address) and [Balance](/components/Balance) Scaffold ETH-2 components, and [useAccount wagmi hook](https://wagmi.sh/react/hooks/useAccount), you can check the details of these components and hook before start implementing this recipe.

## Implementation

### Step 1: Create a Balance Component

Begin by creating a new component in the "components" folder of your application. In our recipe we'll call it "YourBalance.tsx".

```tsx
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";
```

Define your functional component, which we'll call "YourBalance". This component will be used to display the connected account's ETH balance.

```tsx
const YourBalance: NextPage = () => {
  // Your component code will go here.
};
```

### Step 2: Retrieve the Connected Account

Fetch the Ethereum address of the currently connected account using the `useAccount` hook.

```tsx
const { address: connectedAddress } = useAccount();
```

### Step 3: Create the User Interface

Build the user interface to display the address and it's current ETH balance. Here is an example with very basic styling:

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

### Step 4: Add the component to your Application

Import the "YourBalance" component into your application where you want to display the ETH balance of the connected account.

```tsx
import YourBalance from "./YourBalance";
```

### Step 5: Test and Deploy

Test your component to ensure it correctly displays the ETH balance of the connected account. You can compare it with the `RainbowKitCustomConnectButton` component information that is displayed in the top right corner of your application, and verify that both components display the same information.

## Conclusion

By following these steps, you've created a component that displays the connected Address and it's current ETH balance in your dApp. You can extend this component to display the balance of any address by passing the address as a prop to the `Balance` component.

## Full Recipe Code

<details>
  <summary>Here's the complete code for the "YourBalance" component:</summary>

```tsx
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";

const YourBalance: NextPage = () => {
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

export default YourBalance;
```

</details>
