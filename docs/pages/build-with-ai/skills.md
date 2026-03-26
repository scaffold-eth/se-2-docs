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

These skills ship with every SE-2 project:

| Skill | What it does |
|-------|-------------|
| [**OpenZeppelin**](/build-with-ai/openzeppelin) | Library-first development, pattern discovery from installed source. Tokens, access control, security primitives. |
| [**ERC-721**](/build-with-ai/erc-721) | NFT implementation. `_safeMint` reentrancy, on-chain SVG patterns, marketplace metadata, IPFS base URI. |
| [**EIP-5792**](/build-with-ai/eip-5792) | Batch transactions with `wallet_sendCalls`, paymaster integration, ERC-7677 support. |
| [**Ponder**](/build-with-ai/ponder) | Blockchain event indexing. Set up GraphQL APIs for querying on-chain data. |
| [**SIWE**](/build-with-ai/siwe) | Sign-In with Ethereum. Wallet-based authentication, SIWE sessions, EIP-4361. |
| [**x402**](/build-with-ai/x402) | HTTP 402 payment-gated routes. Micropayments and API monetization. |
| [**Drizzle + Neon**](/build-with-ai/drizzle-neon) | Drizzle ORM with Neon PostgreSQL. Off-chain database storage for your dApp. |
| [**Subgraph**](/build-with-ai/subgraph) | The Graph subgraph integration. Index blockchain events via GraphQL. |

:::info
The orchestrator skill is also hosted at [`docs.scaffoldeth.io/SKILL.md`](https://docs.scaffoldeth.io/SKILL.md) — the main entry point AI agents use to scaffold a new SE-2 project from scratch.
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
