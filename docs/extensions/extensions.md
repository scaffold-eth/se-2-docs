---
sidebar_position: 8
---

# 🔌 Extensions

This guide introduces extensions for Scaffold-ETH 2 and explains how to use and create extensions.

## What are Extensions?

Extensions are modular add-ons for Scaffold-ETH 2 that allow developers to enhance and customize their dApps easily. They offer several benefits:

- Seamless integration with the base Scaffold-ETH 2 project
- Quick addition of new features, pages, contracts, or components
- Compatibility with Scaffold-ETH 2 core updates and improvements

> Video Guide: For a visual walkthrough of the extension development process, check out our [YouTube tutorial](https://youtu.be/XQCv533XGZk?si=dlJH4zd4b99_6soW).

## Using Extensions

To use an extension when creating a new Scaffold-ETH 2 project, run:

```bash
npx create-eth@latest -e {your-github-userName}/{extension-repo-name}:{extension-branch-name}
```

The `{extension-branch-name}` is optional. If not specified, it uses the default branch.
