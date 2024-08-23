---
sidebar_position: 9
---

# Available Extensions

Scaffold-ETH 2 offers several pre-built extensions created and maintained by the core developers. These extensions are ready to use and can help jumpstart your dApp development:

- [subgraph](https://github.com/scaffold-eth/create-eth-extensions/tree/subgraph): This Scaffold-ETH 2 extension helps you build and test subgraphs locally for your contracts. It also enables interaction with the front-end and facilitates easy deployment to Subgraph Studio.
- [eip-712](https://github.com/scaffold-eth/create-eth-extensions/tree/eip-712): An implementation of EIP-712, allowing you to send, sign, and verify typed messages in a user-friendly manner.
- [ponder](https://github.com/scaffold-eth/create-eth-extensions/tree/ponder): This Scaffold-ETH 2 extension comes pre-configured with [ponder.sh](https://ponder.sh), providing an example to help you get started quickly.
- [onchainkit](https://github.com/scaffold-eth/create-eth-extensions/tree/onchainkit): This Scaffold-ETH 2 extension comes pre-configured with [onchainkit](https://onchainkit.xyz/), providing an example to help you get started quickly.
- [erc-20](https://github.com/scaffold-eth/create-eth-extensions/tree/erc-20): This extension introduces an ERC-20 token contract and demonstrates how to interact with it, including getting a holder balance and transferring tokens.

To use any of these extensions, you'll modify the general extension usage command. Simply replace the `github-username/repository-name` part with `scaffold-eth/create-eth-extensions`, and specify the extension name after a colon. The command will look like this:

```bash
npx create-eth@latest -e scaffold-eth/create-eth-extensions:<extension-name>
```

For example, to use the subgraph extension:

```bash
npx create-eth@latest -e scaffold-eth/create-eth-extensions:subgraph
```
