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

Point your AI agent to the skill file. You can reference the local copy in your project:

```
Read .agents/skills/erc-721/SKILL.md and use it to add an NFT
contract to this project.
```

Or fetch it from the docs site (useful if you haven't scaffolded yet):

```
Fetch https://docs.scaffoldeth.io/skills/erc-721.md and use it
to add an NFT contract to this project.
```

## Available Skills

These skills ship with every SE-2 project and are also hosted on this site:

| Skill | What it does | Hosted |
|-------|-------------|--------|
| **openzeppelin** | OpenZeppelin Contracts integration. Library-first development, pattern discovery from installed source. | [openzeppelin.md](https://docs.scaffoldeth.io/skills/openzeppelin.md) |
| **erc-721** | NFT implementation with SE-2. Covers `_safeMint` reentrancy, on-chain SVG patterns, marketplace metadata. | [erc-721.md](https://docs.scaffoldeth.io/skills/erc-721.md) |
| **eip-5792** | Batch transactions with `wallet_sendCalls`, paymaster integration, ERC-7677 support. | [eip-5792.md](https://docs.scaffoldeth.io/skills/eip-5792.md) |
| **ponder** | Blockchain event indexing with Ponder. Set up GraphQL APIs for querying on-chain data. | [ponder.md](https://docs.scaffoldeth.io/skills/ponder.md) |
| **siwe** | Sign-In with Ethereum. Wallet-based authentication, SIWE sessions, EIP-4361 compliance. | [siwe.md](https://docs.scaffoldeth.io/skills/siwe.md) |
| **x402** | HTTP 402 payment-gated routes. Add micropayments and API monetization using the x402 protocol. | [x402.md](https://docs.scaffoldeth.io/skills/x402.md) |
| **drizzle-neon** | Drizzle ORM with Neon PostgreSQL. Add off-chain database storage to your dApp. | [drizzle-neon.md](https://docs.scaffoldeth.io/skills/drizzle-neon.md) |
| **subgraph** | The Graph subgraph integration. Index blockchain events and serve them via GraphQL. | [subgraph.md](https://docs.scaffoldeth.io/skills/subgraph.md) |

:::info
The orchestrator skill is also hosted at [`docs.scaffoldeth.io/SKILL.md`](https://docs.scaffoldeth.io/SKILL.md) — this is the main entry point that AI agents use to scaffold a new SE-2 project from scratch.
:::

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
