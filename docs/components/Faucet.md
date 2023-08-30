---
sidebar_position: 6
---

# Faucet

Displays a Faucet button, which opens a modal with a local faucet to send ETH to a given address. A wallet is also provided.

![Faucet Example](/img/Faucet.png)

## Import

```ts
import { Faucet } from "./scaffold-eth";
```

## Usage

```ts
<div className="flex space-x-2 pointer-events-auto">
  {getTargetNetwork().id === hardhat.id && <Faucet />}
</div>
```
