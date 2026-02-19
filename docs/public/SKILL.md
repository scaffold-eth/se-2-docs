---
name: ethereum-app-builder
description: "Scaffold and build Ethereum dApps using create-eth (Scaffold-ETH 2). Use when the user wants to: build an Ethereum app, create a dApp, start a web3 project, use Scaffold-ETH or create-eth, build something onchain, deploy a smart contract, deploy a smart contract with a frontend, or scaffold a full-stack blockchain application."
---

# Ethereum App Builder

Scaffold full-stack Ethereum dApps using create-eth (Scaffold-ETH 2). Guide the user through project setup, scaffold it, then build out their idea.

**Follow these steps strictly in order. Each step must be fully completed before moving to the next. Do not research, plan, or explore anything until the project is scaffolded on disk.**

## Step 1: Scaffold the Project

Run this command immediately -- no planning or research needed beforehand:

```bash
npx create-eth@latest -s <hardhat|foundry> <project-name>
```

- If no preference by the user, use Foundry.
- For the project-name, use a kebab-case

## Step 2: Read the Project Guide

Once the scaffold is on disk, read `<project-name>/AGENTS.md` -- this is the source of truth for the project's structure, patterns, hooks, components, and conventions. Always read it before writing any code.

## Step 3: Fetch Reference Skills (if needed)

Check the [create-eth-extensions](https://github.com/scaffold-eth/create-eth-extensions) repository for reference skills that cover specialized Ethereum needs (event indexing, token standards, etc.). The repo follows a branch-based system -- any branch with `*skill` in its name contains a skill, and the actual skill file is located at `skills/<name>/SKILL.md` within that branch. If any skill is relevant to what the user is building, fetch and use it.

Known reference skills:

- [**Ponder**](https://github.com/scaffold-eth/create-eth-extensions/blob/ponder-extension-to-skills/skills/ponder/SKILL.md) -- Blockchain event indexing with Ponder, including SE-2 integration, schema setup, and GraphQL API

## Step 4: Build the User's Idea

Using `AGENTS.md` and any fetched reference skills as your guide, implement the user's idea -- contracts, frontend, integrations. Make sure it all compiles.
