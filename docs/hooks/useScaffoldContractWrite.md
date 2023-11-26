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
  // For payable functions
  value: parseEther("0.1"),
  // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
  blockConfirmations: 1,
  // The callback function to execute when the transaction is confirmed.
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

## Parameters

This example sends a transaction to the `YourContract` smart contract to call the `setGreeting` function with the arguments passed in `args`. You can also pass other arguments accepted by [useContractWrite wagmi hook](https://wagmi.sh/react/hooks/useContractWrite#configuration).

The `writeAsync` function sends the transaction to the smart contract, and the `isLoading` and `isMining` properties indicate whether the transaction is currently being processed by the network.

It is also possible to pass arguments imperatively to the `writeAsync` function:

```tsx
<button className="btn btn-primary" onClick={() => writeAsync({ args: ["Dynamic value"], value: parseEther("0.2") })}>
  Send TX
</button>
```

## Return Values

- `writeAsync` function sends the transaction to the smart contract.
- `isMining` property indicates whether the transaction is currently being mined.
- The extended object includes properties inherited from wagmi useContractWrite. You can check the [useContractWrite return values](https://wagmi.sh/react/hooks/useContractWrite#return-value) documentation to check the types.
