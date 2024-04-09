---
sidebar_position: 2
---

# useScaffoldWriteContract

Use this hook to send a transaction to your smart contract to write data or perform an action.

```ts
const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");
```

To send the transaction, you can call the `writeContractAsync` function returned by the hook (which we instance as `writeYourContractAsync`). Here's an example usage:

```tsx
<button
  className="btn btn-primary"
  onClick={async () => {
    await writeYourContractAsync({
      functionName: "setGreeting",
      args: ["The value to set"],
      value: parseEther("0.1"),
    });
  }}
>
  Set Greeting
</button>
```

This example sends a transaction to the `YourContract` smart contract to call the `setGreeting` function with the arguments passed in `args`. The `writeContractAsync` function (`writeYourContractAsync` instance) sends the transaction to the smart contract.

## Configuration

| Parameter                          | Type       | Description                                                                                             |
| :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------ |
| **contractName**                   | `string`   | Name of the contract to write to.                                                                       |
| **functionName**                   | `string`   | Name of the function to call.                                                                           |
| **args** (optional)                | `any[]`    | Array of arguments to pass to the function (if accepts any).                                            |
| **value** (optional)               | `bigint`   | Amount of ETH to send with the transaction (for payable functions only).                                |
| **onBlockConfirmation** (optional) | `function` | Callback function to execute when the transaction is confirmed.                                         |
| **blockConfirmations** (optional)  | `number`   | Number of block confirmations to wait for before considering transaction to be confirmed (default : 1). |

You can also pass other arguments accepted by [useWriteContract wagmi hook](https://wagmi.sh/react/api/hooks/useWriteContract).

## Return Values

- `writeContractAsync` function sends the transaction to the smart contract.
- `isMining` property indicates whether the transaction is currently being mined.
- The extended object includes properties inherited from wagmi useWriteContract. You can check the [useWriteContract return values](https://wagmi.sh/react/api/hooks/useWriteContract#return-type) documentation to check the types.
