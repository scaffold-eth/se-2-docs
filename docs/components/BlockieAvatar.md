---
sidebar_position: 6
---

# BlockieAvatar

Show a blockie (bar code profile icon) component for a public address.

If the address has an ENS avatar linked to it, will show it, otherwise will show the generated blockie.

![BlockieAvatar Example](/img/BlockieAvatar.png)

## Import

```ts
import { BlockieAvatar } from "~~/components/scaffold-eth";
```

## Usage

```ts
<BlockieAvatar
  address={account.address}
  size={24}
  ensImage={account.ensAvatar}
/>
```

## Props

- `address` => The address for which you want to display its blockie. Ensure it's in the `0x___` format.

- `ensImage` => ENS avatar from the ENS linked to the address.

- `size` => Width and Height in pixels (square).
