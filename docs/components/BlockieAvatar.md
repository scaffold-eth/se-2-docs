---
sidebar_position: 8
---

# BlockieAvatar

Show a blockie (bar code profile icon) component for a given public address.

If the address has an ENS avatar linked to it, this avatar will be displayed. Otherwise, a generated blockie will be shown.

![BlockieAvatar Example](/img/BlockieAvatar.png)

If you want more control over styling the blockie, you can directly use [blo](https://github.com/bpierre/blo) (pre-installed in Scaffold-ETH 2) and internally used by `BlockieAvatar` component to get the image URL.

## Import

```tsx
import { BlockieAvatar } from "~~/components/scaffold-eth";
```

## Usage

```tsx
<BlockieAvatar address="0x34aA3F359A9D614239015126635CE7732c18fDF3" size={24} />
```

## Props

- `address` => The address for which you want to display its blockie. Ensure it's in the `0x___` format.

- `ensImage` => ENS avatar from the ENS linked to the address.

- `size` => Width and Height in pixels (square).
