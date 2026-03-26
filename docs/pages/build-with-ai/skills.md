---
title: Skills
description: Reusable AI agent instructions for adding features to Scaffold-ETH 2.
---

# Skills

Skills are markdown files (`SKILL.md`) that contain detailed instructions for AI agents to add specific features to your Scaffold-ETH 2 project. Think of them as expert knowledge packaged into a format that AI agents can follow step by step.

## How Skills work

Each skill is a focused guide that covers:

- **Prerequisites** — what needs to be in place before starting
- **Implementation patterns** — the correct way to build the feature in SE-2
- **Gotchas and pitfalls** — common mistakes and how to avoid them
- **SE-2 integration** — how the feature connects to SE-2's hooks, components, and conventions

Skills live in your project at `.agents/skills/<name>/SKILL.md`. Your AI agent reads them before implementing a feature, so it follows proven patterns instead of guessing.

## Using a Skill

Point your AI agent to the skill file:

```
Read .agents/skills/erc-721/SKILL.md and use it to add an NFT
contract to this project.
```

The agent will read the skill, understand the patterns, and implement the feature following SE-2 conventions.

## Available Skills

These skills ship with every SE-2 project:

| Skill | What it does |
|-------|-------------|
| **openzeppelin** | OpenZeppelin Contracts integration. Library-first development, pattern discovery from installed source. Use for tokens, access control, security primitives. |
| **erc-721** | NFT implementation with SE-2. Covers `_safeMint` reentrancy, on-chain SVG patterns, marketplace metadata, IPFS base URI handling. |
| **eip-5792** | Batch transactions with `wallet_sendCalls`, paymaster integration, ERC-7677 support. |
| **ponder** | Blockchain event indexing with Ponder. Set up GraphQL APIs for querying on-chain data. |
| **siwe** | Sign-In with Ethereum. Wallet-based authentication, SIWE sessions, EIP-4361 compliance. |
| **x402** | HTTP 402 payment-gated routes. Add micropayments and API monetization using the x402 protocol. |
| **drizzle-neon** | Drizzle ORM with Neon PostgreSQL. Add off-chain database storage to your dApp. |
| **subgraph** | The Graph subgraph integration. Index blockchain events and serve them via GraphQL. |

## Skills vs Extensions

You might wonder how Skills differ from [Extensions](/extensions):

| | Extensions | Skills |
|---|---|---|
| **When** | At project creation (`npx create-eth@latest`) | Anytime during development |
| **How** | CLI selection during scaffolding | AI agent reads and applies the instructions |
| **What** | Adds boilerplate files to your project | Guides the agent to implement features correctly |
| **Flexibility** | Fixed template output | Agent adapts to your existing code |

Extensions give you a starting point. Skills help you build on top of it with AI assistance.

## Creating your own Skills

You can create custom skills for your project's specific patterns. Add a new `SKILL.md` file in `.agents/skills/<your-skill>/`:

```markdown
---
name: my-custom-skill
description: One-line description of what this skill does
---

# My Custom Skill

## Prerequisites
- What needs to be in place

## Implementation
- Step by step instructions
- Code patterns to follow
- SE-2 integration points

## Gotchas
- Common mistakes to avoid
```

Then reference it in the Skills Index section of your `AGENTS.md` so agents know it exists.
