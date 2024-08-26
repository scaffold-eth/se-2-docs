---
sidebar_position: 9
---

# 🔌 Extensions

This guide introduces extensions for Scaffold-ETH 2 and explains how to use and create extensions.

## What are Extensions?

Extensions are modular add-ons for Scaffold-ETH 2 that provide additional functionality or serve as examples for specific features. They offer several benefits:

- Seamless integration with the base Scaffold-ETH 2 project
- Quick addition of new features, pages, contracts, or components
- Compatibility with Scaffold-ETH 2 core updates and improvements

Extensions just hold the "extra" code you need for your example (such as a specific smart contract or UI component) that are automatically integrated with the latest version of Scaffold-ETH 2 when initializing a new project via npx.

## Using Extensions

To use an extension when creating a new Scaffold-ETH 2 project, run:

```bash
npx create-eth@latest -e {your-github-userName}/{extension-repo-name}:{branch-name}
```

The `{branch-name}` is optional. If not specified, it uses the default branch.
