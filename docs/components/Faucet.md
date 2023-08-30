---
sidebar_position: 6
---

# Faucet

Displays a _"Faucet"_ button, which opens a modal with a Local Faucet to send ETH to a given address. A wallet is also provided.

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
