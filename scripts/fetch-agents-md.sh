#!/bin/bash
# Fetches AGENTS.md from the main SE-2 repo and writes the docs page

REMOTE_URL="https://raw.githubusercontent.com/scaffold-eth/scaffold-eth-2/main/AGENTS.md"
OUTPUT="docs/pages/build-with-ai/agents-md.md"

echo "Fetching AGENTS.md from scaffold-eth-2..."
CONTENT=$(curl -sf "$REMOTE_URL")

if [ -z "$CONTENT" ]; then
  echo "Warning: Failed to fetch AGENTS.md, keeping existing file"
  exit 0
fi

cat > "$OUTPUT" << 'FRONTMATTER'
---
title: AGENTS.md
description: How AGENTS.md gives AI coding agents context about your Scaffold-ETH 2 project.
---

# AGENTS.md

`AGENTS.md` is a markdown file at the root of every Scaffold-ETH 2 project. It provides AI coding agents with structured context about your project — architecture, commands, code style, and available skills — so they can write correct code without guessing.

Most AI coding tools (Claude Code, Cursor, Cline) automatically read this file when they enter your project directory.

:::info
The content below is fetched from [`scaffold-eth-2/AGENTS.md`](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/AGENTS.md) at build time.
:::

---

FRONTMATTER

echo "$CONTENT" >> "$OUTPUT"

echo "Done: $OUTPUT updated"
