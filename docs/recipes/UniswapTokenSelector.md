---
sidebar_position: 5
title: Uniswap-like Token Selector
description: Learn how to create a token selector like the one Uniswap uses.
---

# Uniswap-like Token Selector

This recipe shows how to create a token selector similar to the one used in Uniswap, which displays the currently selected token in the button. The token selector allows users to select a token from a list of supported tokens, or import a custom one using the address.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/UniswapTokenSelector.tsx"
import { useState } from "react";
import { TokenSelector } from "~~/components/scaffold-eth";
import { Token } from "~~/hooks/scaffold-eth";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const UniswapTokenSelector = () => {
  let [token, setToken] = useState<Token | undefined>();

  <TokenSelector
    onChange={setToken}
    suggestedTokens={[
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
      "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
      "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
    ]}
    button={token =>
      token ? (
        <div class="badge badge-lg">
          {token.logoURI && <img src={token.logoURI} alt={token.name} class="w-6 h-6 mr-2" />}
          <span>{token.name}</span>

          <ChevronDownIcon />
        </div>
      ) : (
        <span class="badge badge-lg badge-info">Select token <ChevronDownIcon /></span>
      )
    }
  />;
```

</details>

## Implementation guide

### Step 1: Create a new Component

Begin by creating a new component in the "components" folder of your application.

```tsx title="components/UniswapTokenSelector.tsx"
export const UniswapTokenSelector = () => {
  return (
    <div>
      <h2>Uniswap Token Selector</h2>
    </div>
  );
};
```

### Step 2: Import the TokenSelector Component

Import the `TokenSelector` component from Scaffold ETH-2 and the `Token` type from the `scaffold-eth` hooks. This is the component that will be used to display the token selector, which your component will be built on.

```tsx title="components/UniswapTokenSelector.tsx"
import { TokenSelector } from "~~/components/scaffold-eth";
import { Token } from "~~/hooks/scaffold-eth";
```

### Step 3: Create the Basic Selector

Add the `TokenSelector` component to your component, passing in the necessary props. In this example, we are using the `suggestedTokens` prop to provide a list of tokens that the user can select from. We also set up a `token` state variable to store the selected token.

```tsx title="components/UniswapTokenSelector.tsx"
export const UniswapTokenSelector = () => {
  let [token, setToken] = useState<Token | undefined>();

  return (
    <TokenSelector
      onChange={setToken}
      suggestedTokens={[
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
        "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
        "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
      ]}
    />
  );
};
```

### Step 4: Customize the Button

The `TokenSelector` component allows you to customize the button that triggers the token selector modal. You can pass a `button` function as a prop to define the appearance of the button. In this example, we are using a custom button with a down arrow icon.

```tsx title="components/UniswapTokenSelector.tsx"
export const UniswapTokenSelector = () => {
  let [token, setToken] = useState<Token | undefined>();

  return (
    <TokenSelector
      onChange={setToken}
      suggestedTokens={[
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
        "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
        "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
      ]}
      button={token =>
        token ? (
          <div class="badge badge-lg">
            {token.logoURI && <img src={token.logoURI} alt={token.name} class="w-6 h-6 mr-2" />}
            <span>{token.name}</span>

            <ChevronDownIcon />
          </div>
        ) : (
          <span class="badge badge-lg badge-info">Select token <ChevronDownIcon /></span>
        )
      }
    />
  );
```

Wow, a lot of stuff happened there! Let's break it down:

- We imported the `ChevronDownIcon` from the `@heroicons/react` package to use as the down arrow icon.
- We passed a `button` function as a prop to the `TokenSelector` component. This function receives the selected token as an argument and returns the JSX for the button.
- Inside the `button` function, we check if a token is selected. If a token is selected, we display the token's logo (if available), name, and a down arrow icon. If no token is selected, we display a default message and the down arrow icon.
