---
sidebar_position: 4
---

# EtherInput

Displays input field for ETH/USD amount, with an option to convert between ETH and USD.

![EtherInput Example](/img/etherInput.png)

## Import

```ts
import { EtherInput } from "~~/components/scaffold-eth";
```

## Usage

```ts
const [ethAmount, setEthAmount] = useState("");

<EtherInput value={ethAmount} onChange={(amount) => setEthAmount(amount)} />;
```

## Props

- `value` => You can enter ether quantity or USD quantity, but value will be always stored in ETH.

- `onChange` => Callback that is called when the ether input's amount changes.

- `placeholder` => The string that will be rendered before ether input has been entered.

- `name` => Helps identify the data being sent if EtherInput is submitted into a form.
