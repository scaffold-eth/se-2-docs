---
sidebar_position: 1
---

# AddressInput

Display an Ethereum address input that validates the address format, resolves ENS domains, and shows their avatars.

Also shows a blockie image for each address.

![AddressInput Example](/img/addressInput.png)

## Import

```ts
import { AddressInput } from "~~/components/scaffold-eth";
```

## Usage

```ts
const [validatorAddress, setValidatorAddress] = useState("");

<AddressInput
  value={validatorAddress}
  onChange={(address) => setValidatorAddress(address)}
  placeholder="The friend who is going to validate your goal"
  name="Validator"
/>;
```

## Props

- `value` => An Ethereum address in (`0x___` format) or a ENS domain.

- `onChange` => Callback that is called when the address input's data changes.

- `placeholder` => The string that will be rendered before address input has been entered.

- `name` => Helps identify the data being sent if AddressInput is submitted into a form.

- `disabled` => If `true` sets the address input un-clickable and unusable.
