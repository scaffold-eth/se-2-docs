---
sidebar_position: 1
---

# useScaffoldContractRead

Use this hook to read public variables and get data from read-only functions of your smart contract.

```ts
const { data: totalCounter } = useScaffoldContractRead({
  contractName: "YourContract",
  functionName: "getGreeting",
  args: ["ARGUMENTS IF THE FUNCTION ACCEPTS ANY"],
});
```

This example retrieves the data returned by the `getGreeting` function of the `YourContract` smart contract.

## Configuration

| Parameter        | Type     | Description                                                  |
| :--------------- | :------- | :----------------------------------------------------------- |
| **contractName** | `string` | Name of the contract to read from.                           |
| **functionName** | `string` | Name of the function to call.                                |
| **args**         | `any[]`  | Array of arguments to pass to the function (if accepts any). |

You can also pass other arguments accepted by [useContractRead wagmi hook](https://wagmi.sh/react/hooks/useContractRead#configuration).

## Return Values

- The retrieved data is stored in the `data` property of the returned object.
- You can refetch the data by calling the `refetch` function.
- The extended object includes properties inherited from wagmi useContractRead. You can check the [useContractRead return values](https://wagmi.sh/react/hooks/useContractRead#return-value) documentation to check the types.
