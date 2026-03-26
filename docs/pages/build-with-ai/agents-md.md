---
title: AGENTS.md
description: How AGENTS.md gives AI coding agents context about your Scaffold-ETH 2 project.
---

# AGENTS.md

`AGENTS.md` is a markdown file at the root of every Scaffold-ETH 2 project. It provides AI coding agents with structured context about your project so they can write correct code without hallucinating patterns or guessing at your setup.

## Why it exists

AI agents work best when they understand the project they're working in. Without context, an agent might:

- Use the wrong package manager or commands
- Write Hardhat-style code in a Foundry project (or vice versa)
- Miss SE-2-specific hooks and components
- Ignore code style conventions

`AGENTS.md` solves this by giving agents a single file to read that covers everything they need to know.

## What it contains

The file covers these key areas:

### Project Overview
Which flavor you're using (Hardhat or Foundry), the shared frontend package, and how to detect which flavor is present.

### Common Commands
All the commands an agent needs — `yarn chain`, `yarn deploy`, `yarn start`, contract verification, account management, and deployment to live networks.

### Architecture
How smart contracts work in each flavor, how the frontend interacts with contracts using SE-2's custom hooks (`useScaffoldReadContract`, `useScaffoldWriteContract`, etc.), available UI components from `@scaffold-ui/components`, and styling with DaisyUI.

### Code Style Guide
Naming conventions (`UpperCamelCase` for components, `lowerCamelCase` for variables, `CONSTANT_CASE` for constants), import path aliases (`~~`), page creation patterns, and TypeScript conventions.

### Skills & Agents Index
A directory of available [Skills](/build-with-ai/skills) that agents should read before implementing specific features.

## How agents use it

Most AI coding tools automatically read `AGENTS.md` when they enter a project directory:

- **Claude Code** reads it as part of its project context
- **Cursor** picks it up via its project-level instructions
- **Cline** and other VS Code agents read it when opening a workspace

The agent reads the file once, understands your project structure, and uses that knowledge throughout the session. If the agent needs to add a specific feature (like NFTs or authentication), it follows the Skills Index to read the relevant skill file for detailed patterns.

## Example

Here's a condensed look at what `AGENTS.md` contains:

```markdown
# AGENTS.md

## Project Overview
Scaffold-ETH 2 (SE-2) is a starter kit for building dApps on Ethereum.
It comes in two flavors based on the Solidity framework:
- Hardhat flavor: Uses packages/hardhat
- Foundry flavor: Uses packages/foundry

## Common Commands
yarn chain    # Start local blockchain
yarn deploy   # Deploy contracts
yarn start    # Start Next.js frontend

## Architecture
### Frontend Contract Interaction
Use SE-2 hooks for contract interaction:
- useScaffoldReadContract — read contract data
- useScaffoldWriteContract — write to contracts

## Skills & Agents Index
Read .agents/skills/<name>/SKILL.md before implementing:
- openzeppelin — OpenZeppelin Contracts integration
- erc-721 — NFT implementation patterns
- ponder — blockchain event indexing
- siwe — Sign-In with Ethereum
```

## Customizing AGENTS.md

You can (and should) extend `AGENTS.md` as your project grows. Add sections for:

- **Custom contracts** — explain what your contracts do and how they interact
- **Project-specific patterns** — any conventions your team follows
- **API integrations** — external services your dApp connects to
- **Deployment targets** — which networks you deploy to and any special configuration

The more context you give your AI agent, the better code it writes.
