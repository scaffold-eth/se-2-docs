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
  // Specify the starting block number from which to read events, this is a bigint.
  fromBlock: 31231n,
  // If set to true, the events will be updated every pollingInterval milliseconds set at scaffoldConfig (default: false)
  watch: true,
  filters: { premium: true },
  blockData: true,
  transactionData: true,
  receiptData: true,
});
```

This example retrieves the historical event logs for the `GreetingChange` event of the `YourContract` smart contract, starting from block number 31231 and filtering events where the premium parameter is true.

## Parameters

| Parameter         | Type      | Description                                                                                                           |
| :---------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------- |
| `contractName`    | `string`  | The name of the contract to read from.                                                                                |
| `eventName`       | `string`  | The name of the event to read.                                                                                        |
| `fromBlock`       | `bigint`  | The block number from which to start reading events.                                                                  |
| `filters`         | `object`  | Apply filters to the event based on parameter names and values `{ [parameterName]: value }`.                          |
| `blockData`       | `boolean` | If set to true it will return the block data for each event (default: false).                                         |
| `transactionData` | `boolean` | If set to true it will return the transaction data for each event (default: false).                                   |
| `receiptData`     | `boolean` | If set to true it will return the receipt data for each event (default: false).                                       |
| `watch`           | `boolean` | If set to true, the events will be updated every pollingInterval milliseconds set at scaffoldConfig (default: false). |
| `enabled`         | `boolean` | If set to false, the hook will not fetch any data (default: true).                                                    |

## Return Values

- `data` property of the returned object contains an array of event objects, each containing the event parameters and (optionally) the block, transaction, and receipt data.
- `isLoading` property indicates whether the event logs are currently being fetched.
- `error` property contains any error that occurred during the fetching process (if applicable).
- Since `watch` is set to true, the event logs will be refetched every [`pollingInterval`](/deploying/deploy-nextjs-app#--pollinginterval) (set at `scaffold.config.ts`).
