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
  // It receives the parameters emitted by the event, for this example: GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
  listener: (greetingSetter, newGreeting, premium, value) => {
    console.log(greetingSetter, newGreeting, premium, value);
  },
});
```

This example subscribes to the `GreetingChange` event emitted by the `YourContract` smart contract, and logs the parameters emitted by the event to the console whenever it is emitted. The `listener` function accepts the parameters emitted by the event, and can be customized according to your needs.