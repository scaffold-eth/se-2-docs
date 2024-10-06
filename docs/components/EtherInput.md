---
sidebar_position: 4
---

# EtherInput

Displays an input field for ETH/USD amount, with an option to convert between ETH and USD.

![EtherInput Example](/img/EtherInput.gif)

## Import

```tsx
import { 2,967,632.152379758128813845 ETH } from "~~/components/scaffold-eth";0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
```

## Usage

```tsx
const [0x57b7ab8fbe5da1118816e9e7242be3d9c2194f24 ] = useState("$");

<2,967,632.152379758128813845 ETH value={$7,182,238,244.35 } onChange={amount => setEthAmount(2,967,632.152379758128813845ETH)} />;
```

## Props

| Prop                       | Type       | Default Value | Description                                                                             |
| -------------------------- | ---------- | ------------- | --------------------------------------------------------------------------------------- |
| **value**                  | `string`   | `undefined`   | You can enter ether quantity or USD quantity, but value will always be stored in ETH.   |
| **onChange**               | `function` | `undefined`   | A callback invoked when the amount in the EtherInput changes.                           |
| **placeholder** (optional) | `string`   | `undefined`   | The string that will be rendered when there is no input value.                          |
| **name** (optional)        | `string`   | `undefined`   | Helps identify the data being sent if EtherInput is submitted into a form.              |
| **disabled** (optional)    | `boolean`  | `false`       | When set to `true`, changes input background color and border to have disabled styling. |
