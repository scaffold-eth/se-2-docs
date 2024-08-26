---
sidebar_position: 10
---

# Available Extensions

## Core Extensions

Core extensions are extensions build and maintained by Scaffold-ETH 2 team. This extensions can be directly accessed via just extension name without mentioning the github user name and branch name:

```bash
npx create-eth@latest -e <extension-name>
```

E.g.: `npx create-eth@latest -e subgraph`

Here are the core extensions:

- [subgraph](https://github.com/scaffold-eth/create-eth-extensions/tree/subgraph): This Scaffold-ETH 2 extension helps you build and test subgraphs locally for your contracts. It also enables interaction with the front-end and facilitates easy deployment to Subgraph Studio.
- [eip-712](https://github.com/scaffold-eth/create-eth-extensions/tree/eip-712): An implementation of EIP-712, allowing you to send, sign, and verify typed messages in a user-friendly manner.
- [ponder](https://github.com/scaffold-eth/create-eth-extensions/tree/ponder): This Scaffold-ETH 2 extension comes pre-configured with [ponder.sh](https://ponder.sh), providing an example to help you get started quickly.
- [onchainkit](https://github.com/scaffold-eth/create-eth-extensions/tree/onchainkit): This Scaffold-ETH 2 extension comes pre-configured with [onchainkit](https://onchainkit.xyz/), providing an example to help you get started quickly.
- [erc-20](https://github.com/scaffold-eth/create-eth-extensions/tree/erc-20): This extension introduces an ERC-20 token contract and demonstrates how to interact with it, including getting a holder balance and transferring tokens.

## Third party Extensions

Third-party extensions are extensions built by the community and can be accessed by mentioning the GitHub username and the repository name. To use a third-party extension, use the following format:

```bash
npx create-eth@latest -e {your-github-userName}/{extension-repo-name}:{extension-branch-name} # extension-branch-name is optional
```

To create your own extension, check out the createExtension.md section.
