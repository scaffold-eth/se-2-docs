---
sidebar_position: 3
---

# AddressInput

Display an Ethereum address input that validates the address format, resolves ENS domains, and shows their avatars.

Also shows a blockie image for each address.

![AddressInput Example](/img/addressInput.png)

## Import

```tsx
import { AddressInput } from "~~/components/scaffold-eth";
```

## Usage

```tsx
const [address, setAddress] = useState("");
<AddressInput
  onChange={setAddress}
  value={address}
  placeholder="Input your address"
/>;
```

## Props

- `value` => An Ethereum address in (`0x___` format) or an ENS domain.

- `onChange` => A callback invoked when the data in the address input changes.

- `placeholder` => The string that will be rendered before address input has been entered.

- `name` => Helps identify the data being sent if AddressInput is submitted into a form.

- `disabled` => If `true` sets the address input un-clickable and unusable.
