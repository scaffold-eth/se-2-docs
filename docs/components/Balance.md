---
sidebar_position: 6
---

# Balance

Displays the balance of a given address in both ether (ETH) and US dollars (USD).

![Balance Example](/img/Balance.png)

## Import

```ts
import { Balance } from "~~/components/scaffold-eth";
```

## Usage

```ts
<Balance
  address={address}
  className="text-3xl bg-neutral h-14 p-6 rounded-md mb-6"
/>
```

## Props

- `address` => The address you want to check the balance for. Ensure it's in the `0x___` format.

- `className` => An optional prop to pass additional CSS styling to the component. You can use tailwind and daisyUI for styling.
