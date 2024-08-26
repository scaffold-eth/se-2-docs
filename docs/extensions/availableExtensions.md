---
sidebar_position: 10
---

# Available Extensions

## Core Extensions

Core extensions are extensions built and maintained by Scaffold-ETH 2 team. These extensions can be directly accessed via just extension name without mentioning the github user name and branch name:

```bash
npx create-eth@latest -e <extension-name>
```

E.g.: `npx create-eth@latest -e subgraph`

Here are the core extensions:

- [subgraph](https://github.com/scaffold-eth/create-eth-extensions/tree/subgraph): Uses the subgraphs from [The Graph](https://thegraph.com/) to index and query blockchain data. Helps you build and test subgraphs locally for your contracts. It also enables interaction with the front-end and facilitates easy deployment to Subgraph Studio.
- [ponder](https://github.com/scaffold-eth/create-eth-extensions/tree/ponder): Pre-configured with [ponder.sh](https://ponder.sh), an open-source framework for blockchain application backends. With Ponder, you can quickly build & deploy an API that serves custom data from smart contracts on any EVM blockchain.
- [onchainkit](https://github.com/scaffold-eth/create-eth-extensions/tree/onchainkit): Pre-configured with [onchainkit](https://onchainkit.xyz/),providing an example to help you get started quickly with the ready-to-use React components and TypeScript utilities built by Coinbase team.
- [erc-20](https://github.com/scaffold-eth/create-eth-extensions/tree/erc-20): An implementation of ERC-20 token contract, allowing you to interact with the contract in a user-friendly manner, including getting a holder balance and transferring tokens.
- [eip-712](https://github.com/scaffold-eth/create-eth-extensions/tree/eip-712): An implementation of EIP-712, allowing you to send, sign, and verify typed messages.

## Third-party Extensions

Third-party extensions are extensions built by the community. To use a third-party extension, use the following format:

```bash
npx create-eth@latest -e {github-username}/{extension-repo-name}:{branch-name} # branch-name is optional
```

E.g.: `npx create-eth@latest -e ChangoMan/charts-extension`

To create your own extension, check out the [Creating Your Own Extension](./createExtensions.md) section.
