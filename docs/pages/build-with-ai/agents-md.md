---
title: AGENTS.md
description: How AGENTS.md gives AI coding agents context about your Scaffold-ETH 2 project.
---

# AGENTS.md

`AGENTS.md` is a markdown file at the root of every Scaffold-ETH 2 project. It provides AI coding agents with structured context about your project — architecture, commands, code style, and available skills — so they can write correct code without guessing.

Most AI coding tools (Claude Code, Cursor, Cline) automatically read this file when they enter your project directory.

:::info
View the full file on GitHub: [`scaffold-eth-2/AGENTS.md`](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/AGENTS.md)
:::

## What it covers

- **Project Overview** — which flavor you're using (Hardhat or Foundry), shared frontend package
- **Common Commands** — `yarn chain`, `yarn deploy`, `yarn start`, verification, deployment
- **Architecture** — smart contract patterns, frontend hooks (`useScaffoldReadContract`, `useScaffoldWriteContract`, etc.), UI components, DaisyUI styling
- **Code Style Guide** — naming conventions, import aliases (`~~`), TypeScript patterns
- **Skills & Agents Index** — directory of available [Skills](/build-with-ai/skills) for feature-specific guidance

## Customizing AGENTS.md

You can extend `AGENTS.md` as your project grows. Add sections for your custom contracts, project-specific patterns, API integrations, or deployment targets. The more context you give your AI agent, the better code it writes.
