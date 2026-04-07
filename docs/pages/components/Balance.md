---
title: Balance
description: Display ETH balance with USD conversion.
---

# Balance

Displays the balance of a given address in both ether (ETH) and US dollars (USD).

![Balance Example](/img/Balance.gif)

## Import

```tsx
import { Balance } from "@scaffold-ui/components";
```

## Usage

```tsx
<Balance address="0x34aA3F359A9D614239015126635CE7732c18fDF3" />
```

## Props

| Prop                           | Type             | Default Value | Description                                                                                                  |
| ------------------------------ | ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| **address**                    | `string`         | `undefined`   | Address in `0x___` format to display the balance for.                                                        |
| **chain** (optional)           | `Chain`          | `undefined`   | The blockchain network to fetch the balance from. Defaults to the first configured chain or mainnet.         |
| **defaultUsdMode** (optional)  | `boolean`        | `false`       | When set to `true`, displays the balance in USD by default instead of the native token.                      |
| **style** (optional)           | `CSSProperties`  | `undefined`   | Custom CSS styles to apply to the component.                                                                 |

:::tip[Scaffold-UI]
For more details on customization and theming, check the [Scaffold-UI Balance docs](https://scaffold-ui-docs.vercel.app/components/Balance).
:::
