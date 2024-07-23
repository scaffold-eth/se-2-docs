---
sidebar_position: 4
---

# useScaffoldEventHistory

Use this hook to retrieve historical event logs for your smart contract, providing past activity data, with the option to watch for new events.

```ts
const {
  data: events,
  isLoading: isLoadingEvents,
  error: errorReadingEvents,
} = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "GreetingChange",
  fromBlock: 31231n,
  watch: true,
  filters: { greetingSetter: "0x9eB2C4866aAe575bC88d00DE5061d5063a1bb3aF" },
  blockData: true,
  transactionData: true,
  receiptData: true,
});
```

This example retrieves the historical event logs for the `GreetingChange` event of the `YourContract` smart contract, starting from block number 31231 and filtering events where the `greetingSetter` parameter is `0x9eB2C4866aAe575bC88d00DE5061d5063a1bb3aF`.

## Configuration

| Parameter                      | Type      | Description                                                                                                                                                           |
| :----------------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **contractName**               | `string`  | Name of the contract to read from.                                                                                                                                    |
| **eventName**                  | `string`  | Name of the event to read.                                                                                                                                            |
| **fromBlock**                  | `bigint`  | Block number from which to start reading events.                                                                                                                      |
| **filters** (optional)         | `object`  | Apply filters to the event based on **indexed** parameter names and values `{ [parameterName]: value }`.                                                              |
| **blockData** (optional)       | `boolean` | If set to true it will return the block data for each event (default: false).                                                                                         |
| **transactionData** (optional) | `boolean` | If set to true it will return the transaction data for each event (default: false).                                                                                   |
| **receiptData** (optional)     | `boolean` | If set to true it will return the receipt data for each event (default: false).                                                                                       |
| **watch** (optional)           | `boolean` | If set to true, the events will be refetched every [`pollingInterval`](/deploying/deploy-nextjs-app#--pollinginterval) set at `scaffold.config.ts`. (default: false). |
| **enabled** (optional)         | `boolean` | If set to false, the hook will not fetch any data (default: true).                                                                                                    |

## Return Values

- `data` property of the returned object contains an array of event objects, each containing the event parameters and (optionally) the block, transaction, and receipt data.
- `isLoading` property indicates whether the event logs are currently being fetched.
- `error` property contains any error that occurred during the fetching process (if applicable).
