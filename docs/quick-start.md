---
sidebar_position: 2
---

# 🚀 QuickStart

To set up the app, you have two options:

1. Use git clone to clone the repository.
2. **Beta** Use the npx command: ```npx create-eth@latest``` to bootstrap the project directly.

### Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Setup using ```git clone```

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## *Beta* Setup using ```npx create-eth@latest```

For a simplified setup, Scaffold-ETH 2 offers a beta npx method that guides you interactively through the setup.

1. Bootstrap the project:
```
npx create-eth@latest
```

You will be presented with a series of prompts:

- Your project name: Enter a name for your project, e.g., my-dapp-example.
- What solidity framework do you want to use?: Choose your preferred solidity framework (Hardhat, Foundry)
- Install packages?: Confirm if you want to install the necessary packages, typically by selecting Yes.

2. Once the setup is complete, change to the project directory:

```
cd project-name
```

3. Run a local network in the first terminal:

```
yarn chain
```

4. On a second terminal, deploy the test contract:

```
yarn deploy
```

5. On a third terminal, start your NextJS app:

```
yarn start
```
