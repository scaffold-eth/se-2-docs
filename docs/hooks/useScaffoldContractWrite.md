---
sidebar_position: 2
---

# useScaffoldContractWrite

Use this hook to send a transaction to your smart contract to write data or perform an action.

```ts
const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
  contractName: "YourContract",
  functionName: "setGreeting",
  args: ["The value to set"],
  value: parseEther("0.1"),
  blockConfirmations: 1,
  onBlockConfirmation: txnReceipt => {
    console.log("Transaction blockHash", txnReceipt.blockHash);
  },
});
```

To send the transaction, you can call the `writeAsync` function returned by the hook. Here's an example usage:

```tsx
<button className="btn btn-primary" onClick={() => writeAsync()}>
  Send TX
</button>
```

This example sends a transaction to the `YourContract` smart contract to call the `setGreeting` function with the arguments passed in `args`. The `writeAsync` function sends the transaction to the smart contract.

It is also possible to pass arguments imperatively to the `writeAsync` function:

```tsx
<button className="btn btn-primary" onClick={() => writeAsync({ args: ["Dynamic value"], value: parseEther("0.2") })}>
  Send TX
</button>
```

## Configuration

| Parameter                          | Type       | Description                                                                                             |
| :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------ |
| **contractName**                   | `string`   | Name of the contract to write to.                                                                       |
| **functionName**                   | `string`   | Name of the function to call.                                                                           |
| **args** (optional)                | `any[]`    | Array of arguments to pass to the function (if accepts any).                                            |
| **value** (optional)               | `bigint`   | Amount of ETH to send with the transaction (for payable functions only).                                |
| **onBlockConfirmation** (optional) | `function` | Callback function to execute when the transaction is confirmed.                                         |
| **blockConfirmations** (optional)  | `number`   | Number of block confirmations to wait for before considering transaction to be confirmed (default : 1). |

You can also pass other arguments accepted by [useContractWrite wagmi hook](https://wagmi.sh/react/hooks/useContractWrite#configuration).

## Return Values

- `writeAsync` function sends the transaction to the smart contract.
- `isMining` property indicates whether the transaction is currently being mined.
- The extended object includes properties inherited from wagmi useContractWrite. You can check the [useContractWrite return values](https://wagmi.sh/react/hooks/useContractWrite#return-value) documentation to check the types.
