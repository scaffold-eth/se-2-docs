---
sidebar_position: 6
---

# IntergerInput

Provides a input field for integer values, validating that user input it's a valid integer, and showing error if not.  
Shows by default a small button to multiply input's value \* 10^18 to transform to wei.

![IntegerInput Example](/img/integerInput.png)

## Import

```ts
import { IntegerInput } from "~~/components/scaffold-eth";
```

## Usage

```ts
const [txValue, setTxValue] = useState<string | bigint>("");

<IntegerInput
  value={txValue}
  onChange={(updatedTxValue) => {
    setDisplayedTxResult(undefined);
    setTxValue(updatedTxValue);
  }}
  placeholder="value (wei)"
/>;
```

## Props

- `value` => The data that your input will show.

- `onChange` => Callback that is called when the input's data changes.

- `placeholder` => The string that will be rendered before input data has been entered.

- `name` => Helps identify the data being sent if InputBase is submitted into a form.

- `error` => When set to `true` changes input border to have error styling.

- `disabled` => When set to `true` changes input background color and border to have disabled styling.
