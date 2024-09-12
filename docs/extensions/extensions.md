---
sidebar_position: 9
---

# 🔌 Extensions

This guide introduces extensions for Scaffold-ETH 2 and explains how to install and create them.

## What are Extensions?

Extensions are modular add-ons for Scaffold-ETH 2 that provide additional functionality or serve as examples for specific features.

:::info Info
Extensions can only be installed during the initial setup of a new Scaffold-ETH 2 project.
:::info Info

They offer several benefits:

- Seamless integration with the base Scaffold-ETH 2 project
- Quick addition of new features, pages, contracts, or components at project creation
- Compatibility with Scaffold-ETH 2 core updates and improvements

Extensions are compact packages containing specific code (such as a smart contract or UI component) that automatically integrate with the latest version of Scaffold-ETH 2 when initializing a new project via npx. They are starting points for your project, not finished products.

## Installing Extensions

To install an extension when creating a new Scaffold-ETH 2 project, run:

```bash
npx create-eth@latest -e {github-username}/{extension-repo-name}:{branch-name}
```

The `{branch-name}` is optional. If not specified, it uses the default branch.

E.g.: `npx create-eth@latest -e ChangoMan/charts-extension`
