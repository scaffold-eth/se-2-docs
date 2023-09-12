---
sidebar_position: 2
---

# Balance

Displays the balance of a given address in both ether (ETH) and US dollars (USD).

![Balance Example](/img/Balance.gif)

## Import

```tsx
import { Balance } from "~~/components/scaffold-eth";
```

## Usage

```tsx
<Balance address="0x34aA3F359A9D614239015126635CE7732c18fDF3" />
```

## Props

- `address` => The address you want to check the balance for. Ensure it's in the `0x___` format.

- `className` (optional) => Prop to pass additional CSS styling to the component. You can use tailwind / daisyUI classes like `text-3xl` for styling.
