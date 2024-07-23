---
sidebar_position: 1
title: Get balance of the connected account
description: Learn how to retrieve and display the ETH balance of the connected account in your dApp.
---

# Get the Current Balance of the Connected Account

This recipe shows how to fetch and display the ETH balance of the currently connected account.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ConnectedAddressBalance.tsx"
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";

export const ConnectedAddressBalance = () => {
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
```

</details>

## Implementation guide

### Step 1: Create a new Component

Begin by creating a new component in the "components" folder of your application.

```tsx title="components/ConnectedAddressBalance.tsx"
export const ConnectedAddressBalance = () => {
  return (
    <div>
      <h2>Your Ethereum Balance</h2>
    </div>
  );
};
```

### Step 2: Retrieve the Connected Account

Fetch the Ethereum address of the currently connected account using the [useAccount wagmi hook](https://wagmi.sh/react/api/hooks/useAccount) and easily display them using Scaffold ETH-2 [Address](/components/Address) and [Balance](/components/Balance) components.

```tsx title="components/ConnectedAddressBalance.tsx"
// highlight-start
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";
// highlight-end

export const ConnectedAddressBalance = () => {
  // highlight-start
  const { address: connectedAddress } = useAccount();
  // highlight-end

  return (
    <div>
      <h2>Your Ethereum Balance</h2>
      {/* highlight-start */}
      Address: <Address address={connectedAddress} />
      Balance: <Balance address={connectedAddress} />
      {/* highlight-end */}
    </div>
  );
};
```
