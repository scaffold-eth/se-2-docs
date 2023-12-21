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

| Prop                     | Type     | Default Value | Description                                                                                                               |
| ------------------------ | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **address**              | `string` | `undefined`   | Address in `0x___` format, it will resolve its ENS if it has one associated.                                              |
| **className** (optional) | `string` | `""`          | Prop to pass additional CSS styling to the component. You can use Tailwind / daisyUI classes like `text-3xl` for styling. |
