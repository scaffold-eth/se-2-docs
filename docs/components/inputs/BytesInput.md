---
sidebar_position: 3
---

# TODO-BytesInput

Display a `bytes` input, having a conversion tool in the input to convert from `string` to `bytes`.

![BytesInput Example](/img/BytesInput.png)

## Import

```ts
import { BytesInput } from "~~/components/scaffold-eth";
```

## Usage

```ts
const inputProps = {
  name: stateObjectKey,
  value: form?.[stateObjectKey],
  placeholder: paramType.name
    ? `${paramType.type} ${paramType.name}`
    : paramType.type,
  onChange: (value: any) => {
    setForm((form) => ({ ...form, [stateObjectKey]: value }));
  },
};

<BytesInput {...inputProps} />;
```

## Props

- `value` => You can enter a valid hexadecimal or you can input a string and use the conversion utility to be converted to bytes32.

- `onChange` => Callback that is called when the bytes32 input data changes.

- `placeholder` => The string that will be rendered before bytes32 input has been entered.

- `name` => Helps identify the data being sent if Bytes32Input is submitted into a form.

- `disabled` => If `true` sets the bytes input un-clickable and unusable.
