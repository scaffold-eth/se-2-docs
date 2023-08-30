---
sidebar_position: 1
---

# AddressInput

Display an address input, that resolves ENS domains and displays its avatars, plus a blockie image for each address.

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

- `value` => You can enter an address (`0x___` format) or enter a ENS domain.

- `onChange` => Callback that is called when the address input's data changes.

- `placeholder` => The string that will be rendered before address input has been entered.

- `name` => Helps identify the data being sent if AddressInput is submitted into a form.

- `disabled` => If `true` sets the address input un-clickable and unusable.
