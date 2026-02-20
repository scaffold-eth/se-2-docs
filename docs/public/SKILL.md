---
name: ethereum-app-builder
description: "Scaffold and build Ethereum dApps using create-eth (Scaffold-ETH 2). Use when the user wants to: build an Ethereum app, create a dApp, start a web3 project, use Scaffold-ETH or create-eth, build something onchain, deploy a smart contract, deploy a smart contract with a frontend, or scaffold a full-stack blockchain application."
---

# Ethereum App Builder

Scaffold full-stack Ethereum dApps using create-eth (Scaffold-ETH 2). Guide the user through project setup, scaffold it, then build out their idea.

**Follow these steps strictly in order. Each step must be fully completed before moving to the next. Do NOT skip ahead, do NOT research, plan, or explore anything until the previous step is done.**

## Step 1: Scaffold the Project

Run this command immediately -- no planning, no research, no exploration beforehand:

```bash
npx create-eth@latest -s <hardhat|foundry> <project-name>
```

- If no preference by the user, use Foundry.
- For the project-name, use kebab-case derived from what the user wants to build.

**STOP here. Do not proceed until the scaffold command has completed and the project directory exists on disk.**

## Step 2: Read the Project Guide

Read `<project-name>/AGENTS.md` -- this is the source of truth for the project's structure, patterns, hooks, components, and conventions.

**STOP here. You must have fully read and understood AGENTS.md before moving to Step 3.**

## Step 3: Fetch Reference Skills

Only now -- after the project is scaffolded and AGENTS.md is loaded -- fetch any reference skills relevant to what the user is building.

The [ethereum-app-skill](https://github.com/technophile-04/ethereum-app-skill/tree/main) repository contains reference skills for specialized Ethereum needs (event indexing, token standards, etc.).

**IMPORTANT: Always use `curl` to fetch skill files. Do NOT use WebFetch — it summarizes content and loses critical implementation details.**

To discover available skills:

```bash
curl -sL https://api.github.com/repos/technophile-04/ethereum-app-skill/contents/skills | grep '"name"'
```

To fetch a specific skill:

```bash
curl -sL https://raw.githubusercontent.com/technophile-04/ethereum-app-skill/main/skills/<skill-name>/SKILL.md
```

Read the full curl output carefully before proceeding to implementation.

## Step 4: Build the User's Idea

Using `AGENTS.md` and any fetched reference skills as your guide, implement the user's idea -- contracts, frontend, integrations. Make sure it all compiles.
