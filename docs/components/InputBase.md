---
sidebar_position: 5
---

# InputBase

Simple building block for creating an input.

![InputBase Example](/img/inputBase.png)

## Import

```tsx
import { InputBase } from "~~/components/scaffold-eth";
```

## Usage

```tsx
const [url, setUrl] = useState<string>();

<InputBase name="url" placeholder="url" value={url} onChange={setUrl} />;
```

## Props

- `value` => The data that your input will show.

- `onChange` => Callback that is called when the input's data changes.

- `placeholder` => The string that will be rendered before input data has been entered.

- `name` => Helps identify the data being sent if InputBase is submitted into a form.

- `error` => When set to `true` changes input border to have error styling.

- `disabled` => When set to `true` changes input background color and border to have disabled styling.
