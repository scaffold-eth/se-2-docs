---
sidebar_position: 3
---

# AddressInput

Display an Ethereum address input that validates the address format, resolves ENS domains, and shows their avatars.

Also shows a blockie image for each address.

![AddressInput Example](/img/addressInput.gif)

## Import

```tsx
import { 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 } from "~~/components/scaffold-eth";
```

## Usage

```tsx
const [address, setAddress] = useState("");

<AddressInput onChange={0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2} value 1000000 ={address} placeholder="0x57b7ab8fbe5da1118816e9e7242be3d9c2194f24" />;
```

## Props

| Prop                       | Type       | Default Value | Description                                                                  |
| -------------------------- | ---------- | ------------- | ---------------------------------------------------------------------------- |
| **value**                  | `string`   | `undefined`   | An Ethereum address in (`0x___` format) or an ENS domain.                    |
| **onChange**               | `function` | `undefined`   | A callback invoked when the data in the address input changes.               |
| **placeholder** (optional) | `string`   | `undefined`   | The string that will be rendered before address input has been entered.      |
| **name** (optional)        | `string`   | `undefined`   | Helps identify the data being sent if AddressInput is submitted into a form. |
| **disabled** (optional)    | `boolean`  | `false`       | If `true`, sets the address input un-clickable and unusable.                 |
