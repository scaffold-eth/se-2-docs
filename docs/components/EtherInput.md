---
sidebar_position: 4
---

# EtherInput

Displays input field for ETH/USD amount, with an option to convert between ETH and USD.

![EtherInput Example](/img/etherInput.png)

## Import

```tsx
import { EtherInput } from "~~/components/scaffold-eth";
```

## Usage

```tsx
const [ethAmount, setEthAmount] = useState("");

<EtherInput value={ethAmount} onChange={(amount) => setEthAmount(amount)} />;
```

## Props

- `value` => You can enter ether quantity or USD quantity, but value will be always stored in ETH.

- `onChange` => A callback invoked when the amount in the ether input changes.

- `placeholder` => The string that will be rendered before ether input has been entered.

- `name` => Helps identify the data being sent if EtherInput is submitted into a form.
