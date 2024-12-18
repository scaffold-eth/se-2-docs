---
sidebar_position: 4
---

# EtherInput

Displays an input field for ETH/USD amount, with an option to convert between ETH and USD.

![EtherInput Example](/img/EtherInput.gif)

## Import

```tsx
import { EtherInput } from "~~/components/scaffold-eth";
```

## Usage

```tsx
const [ethAmount, setEthAmount] = useState("");
```

```tsx
<EtherInput value={ethAmount} onChange={amount => setEthAmount(amount)} />
```

## Props

| Prop                       | Type       | Default Value | Description                                                                             |
| -------------------------- | ---------- | ------------- | --------------------------------------------------------------------------------------- |
| **value**                  | `string`   | `undefined`   | You can enter ether quantity or USD quantity, but value will always be stored in ETH.   |
| **onChange**               | `function` | `undefined`   | A callback invoked when the amount in the EtherInput changes.                           |
| **placeholder** (optional) | `string`   | `undefined`   | The string that will be rendered when there is no input value.                          |
| **name** (optional)        | `string`   | `undefined`   | Helps identify the data being sent if EtherInput is submitted into a form.              |
| **disabled** (optional)    | `boolean`  | `false`       | When set to `true`, changes input background color and border to have disabled styling. |
