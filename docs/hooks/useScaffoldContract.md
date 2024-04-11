---
sidebar_position: 6
---

# useScaffoldContract

Use this hook to get your contract instance by providing the contract name. It enables you to interact with your contract methods.
For reading data or sending transactions, it's recommended to use `useScaffoldReadContract` and `useScaffoldWriteContract`.

```ts
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
});
// Returns the greeting and can be called in any function, unlike useScaffoldReadContract
await yourContract?.read.greeting();

// Used to write to a contract and can be called in any function
import { useWalletClient } from "wagmi";

const { data: walletClient } = useWalletClient();
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
  walletClient,
});
const setGreeting = async () => {
  // Call the method in any function
  await yourContract?.write.setGreeting(["the greeting here"]);
};
```

This example uses the `useScaffoldContract` hook to obtain a contract instance for the `YourContract` smart contract.

## Configuration

| Parameter                   | Type                                                               | Description                                                                   |
| :-------------------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **contractName**            | `string`                                                           | Name of the contract.                                                         |
| **walletClient** (optional) | [`WalletClient`](https://wagmi.sh/react/api/hooks/useWalletClient) | Wallet client must be passed in order to call `write` methods of the contract |

## Return Value

- `data` : Object representing viem's [contract instance](https://viem.sh/docs/contract/getContract.html#return-value). Which can be used to call `read` and `write` of the contract.

- `isLoading` : Boolean indicating if the contract is being loaded.
