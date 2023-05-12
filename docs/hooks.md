---
sidebar_position: 3
---

# Custom Hooks: Interacting with your Smart Contracts

Scaffold-ETH 2 provides a collection of custom React hooks designed to simplify interactions with your deployed smart contracts. These hooks are wrappers around `wagmi`, automatically loading the necessary contract ABI and address. They offer an easy-to-use interface for reading from, writing to, and monitoring events emitted by your smart contracts.

To help developers get started with smart contract interaction using Scaffold-ETH 2, we've provided the following custom hooks:

- [useScaffoldContractRead](#usescaffoldcontractread): for reading public variables and getting data from read-only functions of your contract.
- [useScaffoldContractWrite](#usescaffoldcontractwrite): for sending transactions to your contract to write data or perform an action.
- [useScaffoldEventSubscriber](#usescaffoldeventsubscriber): for subscribing to your contract events and receiving real-time updates when events are emitted.
- [useScaffoldEventHistory](#usescaffoldeventhistory): for retrieving historical event logs for your contract, providing past activity data.
- [useDeployedContractInfo](#usedeployedcontractinfo): for fetching details from your contract, including the ABI and address.
- [useScaffoldContract](#usescaffoldcontract): for obtaining a contract instance that lets you interact with the methods of your deployed smart contract.

These hooks offer a simplified and streamlined interface for interacting with your smart contracts. If you need to interact with external contracts, you can use `wagmi` directly, or add external contract data to your `deployedContracts.ts` file.

### useScaffoldContractRead:

Use this hook to read public variables and get data from read-only functions of your smart contract.

```ts
const { data: totalCounter } = useScaffoldContractRead({
  contractName: "YourContract",
  functionName: "getGreeting",
  args: ["ARGUMENTS IF THE FUNCTION ACCEPTS ANY"],
});
```

This example retrieves the data returned by the `getGreeting` function of the `YourContract` smart contract. If the function accepts any arguments, they can be passed in the args array. The retrieved data is stored in the `data` property of the returned object.

### useScaffoldContractWrite:

Use this hook to send a transaction to your smart contract to write data or perform an action.

```ts
const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
  contractName: "YourContract",
  functionName: "setGreeting",
  args: ["The value to set"],
  // For payable functions, expressed in ETH
  value: "0.01",
});
```

To send the transaction, you can call the `writeAsync` function returned by the hook. Here's an example usage:

```ts
<button className="btn btn-primary" onClick={writeAsync}>
  Send TX
</button>
```

This example sends a transaction to the `YourContract` smart contract to call the `setGreeting` function with the arguments passed in `args`. The `writeAsync` function sends the transaction to the smart contract, and the `isLoading` and `isMining` properties indicate whether the transaction is currently being processed by the network.

### useScaffoldEventSubscriber:

Use this hook to subscribe to events emitted by your smart contract, and receive real-time updates when these events are emitted.

```ts
useScaffoldEventSubscriber({
  contractName: "YourContract",
  eventName: "GreetingChange",
  // The listener function is called whenever a GreetingChange event is emitted by the contract.
  // It receives the parameters emitted by the event, for this example: GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
  listener: (greetingSetter, newGreeting, premium, value) => {
    console.log(greetingSetter, newGreeting, premium, value);
  },
});
```

This example subscribes to the `GreetingChange` event emitted by the `YourContract` smart contract, and logs the parameters emitted by the event to the console whenever it is emitted. The `listener` function accepts the parameters emitted by the event, and can be customized according to your needs.

### useScaffoldEventHistory:

Use this hook to retrieve historical event logs for your smart contract, providing past activity data.

```ts
const {
  data: events,
  isLoading: isLoadingEvents,
  error: errorReadingEvents,
  } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "GreetingChange",
  // Specify the starting block number from which to read events.
  fromBlock: 31231,
  blockData: true,
  // Apply filters to the event based on parameter names and values { [parameterName]: value },
  filters: { premium: true }
  // If set to true it will return the transaction data for each event (default: false),
  transactionData: true,
  // If set to true it will return the receipt data for each event (default: false),
  receiptData: true
});
```

This example retrieves the historical event logs for the `GreetingChange` event of the `YourContract` smart contract, starting from block number 31231 and filtering events where the premium parameter is true. The data property of the returned object contains an array of event objects, each containing the event parameters and (optionally) the block, transaction, and receipt data. The `isLoading` property indicates whether the event logs are currently being fetched, and the `error` property contains any error that occurred during the fetching process (if applicable).

### useDeployedContractInfo:

Use this hook to fetch details about a deployed smart contract, including the ABI and address.

```ts
// ContractName: name of the deployed contract
const { data: deployedContractData } = useDeployedContractInfo(contractName);
```

This example retrieves the details of the deployed contract with the specified name and stores the details in the deployedContractData object.

### useScaffoldContract:

Use this hook to get your contract instance by providing the contract name. It enables you interact with your contract methods.
For reading data or sending transactions, it's recommended to use `useScaffoldContractRead` and `useScaffoldContractWrite`.

```ts
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
});
// Returns the greeting and can be called in any function, unlike useScaffoldContractRead
await yourContract?.greeting();

// Used to write to a contract and can be called in any function
import { Signer } from "ethers";
import { useSigner } from "wagmi";

const { data: signer, isError, isLoading } = useSigner();
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
  signerOrProvider: signer as Signer,
});
const setGreeting = async () => {
  // Call the method in any function
  await yourContract?.setGreeting("the greeting here");
};
```

This example uses the `useScaffoldContract` hook to obtain a contract instance for the `YourContract` smart contract. The data property of the returned object contains the contract instance that can be used to call any of the smart contract methods.
