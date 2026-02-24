---
name: ethereum-app-builder
description: "Scaffold and build Ethereum dApps using create-eth (Scaffold-ETH 2). Use when the user wants to: build an Ethereum app, create a dApp, start a web3 project, use Scaffold-ETH or create-eth, build something onchain, deploy a smart contract, deploy a smart contract with a frontend, or scaffold a full-stack blockchain application."
---

# Ethereum App Builder

Scaffold full-stack Ethereum dApps using create-eth (Scaffold-ETH 2). Guide the user through project setup, scaffold it, then build out their idea.

**Follow these steps strictly in order. Each step must be fully completed before moving to the next. Do NOT skip ahead, do NOT research, plan, or explore anything until the previous step is done.**

## Step 1: Scaffold the Project

Before running the scaffold command, do these pre-flight checks in order:

1. **Detect OS:** run `uname -o 2>/dev/null || echo "Windows"`.
   - If output contains `Msys`, `Cygwin`, or `Windows` → use Hardhat. Do not check for Foundry. Foundry has known compatibility issues with create-eth on Windows.
   - If Linux/Mac → run `forge --version`. If Foundry is available use it, otherwise fall back to Hardhat.

2. **Resolve project name:** suggest a kebab-case name derived from what the user wants to build. Check if that directory already exists in the current location. If it does, auto-increment the suffix (`-2`, `-3`, etc.) until a free name is found.

3. **Important: Always confirm with the user if he wants to use the resolved <project-name>, and let him choose another one if he doesn't like resolved one.**. If the user choose another project name, use it as <project-name> in the next command.

Then run:

```bash
npx create-eth@latest -s <hardhat|foundry> <project-name>
```

- If no preference by the user, use Foundry.
- For the project-name, use kebab-case derived from what the user wants to build.

**STOP here. Do not proceed until the scaffold command has completed and the project directory exists on disk.**

## Step 2: Read the Project Guide

Read `<project-name>/AGENTS.md` -- this is the source of truth for the project's structure, patterns, hooks, components, and conventions.

**STOP here. You must have fully read and understood AGENTS.md before moving to Step 3.**

## Step 3: Read Reference Skills

After the project is scaffolded and AGENTS.md is loaded, **read relevant `.agents/skills/<skill-name>/SKILL.md` file to what the user is building.**

## Step 4: Build the User's Idea

Follow `AGENTS.md` and the reference skills to implement what the user asked for (contracts, frontend, integrations, etc). Make sure it all compiles.
