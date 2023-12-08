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

This example retrieves the data returned by the `getGreeting` function of the `YourContract` smart contract. If the function accepts any arguments, they can be passed in the args array. The retrieved data is stored in the `data` property of the returned object.
