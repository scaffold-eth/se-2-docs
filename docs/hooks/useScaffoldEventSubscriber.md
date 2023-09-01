---
sidebar_position: 3
---

# useScaffoldEventSubscriber

Use this hook to subscribe to events emitted by your smart contract, and receive real-time updates when these events are emitted.

```ts
useScaffoldEventSubscriber({
  contractName: "YourContract",
  eventName: "GreetingChange",
  // The listener function is called whenever a GreetingChange event is emitted by the contract.
  // Parameters emitted by the event can be destructed using the below example
  // for this example: event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
  listener: (logs) => {
    logs.map((log) => {
      const { greetingSetter, value, premium, newGreeting } = log.args;
      console.log(
        "📡 GreetingChange event",
        greetingSetter,
        value,
        premium,
        newGreeting
      );
    });
  },
});
```

This example subscribes to the `GreetingChange` event emitted by the `YourContract` smart contract and logs the parameters from the event to the console when it's emitted. The `listener` function accepts an array of `logs` that occurred during the [ `pollingInterval` ](/deploying/deploy-nextjs-app#--pollinginterval) and each array items contains an `args` property which can be destructured to get the parameters emitted by the event, this function can customized according to your needs.

:::note

It is recommended to `setState` using [updater function](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state) in `listener` function to avoid problems due to caching.

:::
