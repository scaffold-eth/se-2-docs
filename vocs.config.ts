import { defineConfig } from "vocs";
import fs from "node:fs";
import path from "node:path";

const SKILLS_DIR = "docs/pages/build-with-ai";
const CACHE_FILE = "node_modules/.cache/skills-cache.json";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const GITHUB_API =
  "https://api.github.com/repos/scaffold-eth/scaffold-eth-2/contents/.agents/skills";

type Skill = {
  name: string;
  title: string;
  shortDesc: string;
  content: string;
};

type GitHubContent = {
  name: string;
  type: string;
  download_url: string | null;
};

// Pretty names for sidebar display
const SKILL_TITLES: Record<string, string> = {
  openzeppelin: "OpenZeppelin",
  "erc-721": "ERC-721",
  "eip-5792": "EIP-5792",
  ponder: "Ponder",
  siwe: "SIWE",
  x402: "x402",
  "drizzle-neon": "Drizzle + Neon",
  subgraph: "Subgraph",
};

function readCache(): Skill[] | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const { timestamp, skills } = JSON.parse(
      fs.readFileSync(CACHE_FILE, "utf-8"),
    );
    if (Date.now() - timestamp < CACHE_TTL) return skills;
  } catch {}
  return null;
}

function writeCache(skills: Skill[]) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(
    CACHE_FILE,
    JSON.stringify({ timestamp: Date.now(), skills }),
  );
}

async function fetchSkillNames(): Promise<string[]> {
  // Try GitHub API first (discovers new skills automatically)
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(GITHUB_API, { headers });
    if (res.ok) {
      const dirs: GitHubContent[] = await res.json();
      return dirs.filter((d) => d.type === "dir").map((d) => d.name);
    }
  } catch {}

  // Fallback: known skill names (still fetches content from raw.githubusercontent)
  console.log("   Using known skill list as fallback for directory listing.");
  return Object.keys(SKILL_TITLES);
}

async function fetchSkillContent(name: string): Promise<Skill | null> {
  // raw.githubusercontent.com has much higher rate limits than API
  const rawUrl = `https://raw.githubusercontent.com/scaffold-eth/scaffold-eth-2/main/.agents/skills/${name}/SKILL.md`;
  const res = await fetch(rawUrl);
  if (!res.ok) return null;

  const content = await res.text();

  const descMatch = content.match(/description:\s*"([^"]+)"/);
  const shortDesc = descMatch
    ? descMatch[1].split(". Use when")[0]
    : `${name} skill for Scaffold-ETH 2`;

  const body = content.replace(/^---[\s\S]*?---\n*/, "");
  const title = SKILL_TITLES[name] || name;

  const vocsContent = `---
title: "${title}"
description: "${shortDesc}"
---

${body}`;

  return { name, title, shortDesc, content: vocsContent };
}

async function fetchSkillsFromGitHub(): Promise<Skill[]> {
  const names = await fetchSkillNames();

  const skills = await Promise.all(names.map(fetchSkillContent));

  return skills.filter(Boolean) as Skill[];
}

async function getSkills(): Promise<Skill[]> {
  // Check cache first (avoids re-fetching on Vocs's multiple config evaluations)
  const cached = readCache();
  if (cached) return cached;

  try {
    const skills = await fetchSkillsFromGitHub();
    writeCache(skills);
    return skills;
  } catch (err) {
    console.warn("⚠️  Failed to fetch skills from GitHub:", err);
    console.warn("   Using existing local files as fallback.");
    return [];
  }
}

// --- Fetch skills and write pages at config time ---
const skills = await getSkills();

if (skills.length > 0) {
  fs.mkdirSync(SKILLS_DIR, { recursive: true });

  for (const skill of skills) {
    const filePath = path.join(SKILLS_DIR, `${skill.name}.md`);
    fs.writeFileSync(filePath, skill.content);
  }

  // Generate the skills overview table
  const tableRows = skills
    .map(
      (s) =>
        `| [**${s.title}**](/build-with-ai/${s.name}) | ${s.shortDesc} |`,
    )
    .join("\n");

  const skillsOverview = `---
title: Skills
description: Reusable AI agent instructions for adding features to Scaffold-ETH 2.
---

# Skills

Skills are markdown files (\`SKILL.md\`) that contain detailed instructions for AI agents to add specific features to your Scaffold-ETH 2 project. Think of them as expert knowledge packaged into a format that AI agents can follow step by step.

## How Skills work

Each skill is a focused guide that covers:

- **Prerequisites** — what needs to be in place before starting
- **Implementation patterns** — the correct way to build the feature in SE-2
- **Gotchas and pitfalls** — common mistakes and how to avoid them
- **SE-2 integration** — how the feature connects to SE-2's hooks, components, and conventions

Skills live in your project at \`.agents/skills/<name>/SKILL.md\`. Your AI agent reads them before implementing a feature, so it follows proven patterns instead of guessing.

## Using a Skill

Point your AI agent to the skill file in your project:

\`\`\`
Read .agents/skills/erc-721/SKILL.md and use it to add an NFT
contract to this project.
\`\`\`

The agent will read the skill, understand the patterns, and implement the feature following SE-2 conventions.

## Available Skills

These skills ship with every SE-2 project:

| Skill | What it does |
|-------|-------------|
${tableRows}

:::info
The orchestrator skill is also hosted at [\`docs.scaffoldeth.io/SKILL.md\`](https://docs.scaffoldeth.io/SKILL.md) — the main entry point AI agents use to scaffold a new SE-2 project from scratch.
:::

## Skills vs Extensions

| | Extensions | Skills |
|---|---|---|
| **When** | At project creation (\`npx create-eth@latest\`) | Anytime during development |
| **How** | CLI selection during scaffolding | AI agent reads and applies the instructions |
| **What** | Adds boilerplate files to your project | Guides the agent to implement features correctly |
| **Flexibility** | Fixed template output | Agent adapts to your existing code |

Extensions give you a starting point. Skills help you build on top of it with AI assistance.

## Creating your own Skills

You can create custom skills for your project's specific patterns. Add a new \`SKILL.md\` file in \`.agents/skills/<your-skill>/\`:

\`\`\`markdown
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
\`\`\`

Then reference it in the Skills Index section of your \`AGENTS.md\` so agents know it exists.
`;

  fs.writeFileSync(path.join(SKILLS_DIR, "skills.md"), skillsOverview);

  console.log(`✅ Fetched ${skills.length} skills from GitHub`);
}

// --- Build sidebar with fetched skills ---
const skillSidebarItems = skills.map((s) => ({
  text: s.title,
  link: `/build-with-ai/${s.name}`,
}));

export default defineConfig({
  title: "🏗 Scaffold-ETH 2 | Docs",
  description: "Open-source toolkit for building dapps",
  logoUrl: "/img/logo.svg",
  iconUrl: "/img/favicon.png",
  baseUrl: "https://docs.scaffoldeth.io",
  ogImageUrl: {
    "/": "https://vocs.dev/api/og?logo=%logo&title=%title&description=%description",
  },
  vite: {
    publicDir: "docs/public",
  },
  sidebar: [
    {
      text: "🏗️ Welcome to Scaffold-ETH 2",
      link: "/",
    },
    {
      text: "🚀 Quick Start",
      items: [
        {
          text: "Installation",
          link: "/quick-start/installation",
        },
        {
          text: "Environment",
          link: "/quick-start/environment",
        },
      ],
    },
    {
      text: "⚙ Components",
      items: [
        {
          text: "Overview",
          link: "/components",
        },
        {
          text: "Address",
          link: "/components/Address",
        },
        {
          text: "AddressInput",
          link: "/components/AddressInput",
        },
        {
          text: "Balance",
          link: "/components/Balance",
        },
        {
          text: "BlockieAvatar",
          link: "/components/BlockieAvatar",
        },
        {
          text: "EtherInput",
          link: "/components/EtherInput",
        },
        {
          text: "InputBase",
          link: "/components/InputBase",
        },
        {
          text: "IntegerInput",
          link: "/components/IntegerInput",
        },
        {
          text: "RainbowKitCustomConnectButton",
          link: "/components/RainbowKitCustomConnectButton",
        },
      ],
    },
    {
      text: "🪝 Hooks",
      items: [
        {
          text: "Overview",
          link: "/hooks",
        },
        {
          text: "useScaffoldReadContract",
          link: "/hooks/useScaffoldReadContract",
        },
        {
          text: "useScaffoldWriteContract",
          link: "/hooks/useScaffoldWriteContract",
        },
        {
          text: "useScaffoldWatchContractEvent",
          link: "/hooks/useScaffoldWatchContractEvent",
        },
        {
          text: "useScaffoldEventHistory",
          link: "/hooks/useScaffoldEventHistory",
        },
        {
          text: "useDeployedContractInfo",
          link: "/hooks/useDeployedContractInfo",
        },
        {
          text: "useScaffoldContract",
          link: "/hooks/useScaffoldContract",
        },
        {
          text: "useTransactor",
          link: "/hooks/useTransactor",
        },
      ],
    },
    {
      text: "📡 External Contracts",
      link: "/external-contracts",
    },
    {
      text: "🧪 Recipes",
      items: [
        {
          text: "Get Current Balance From Account",
          link: "/recipes/GetCurrentBalanceFromAccount",
        },
        {
          text: "Write To Contract Write Async Button",
          link: "/recipes/WriteToContractWriteAsyncButton",
        },
        {
          text: "Read Uint From Contract",
          link: "/recipes/ReadUintFromContract",
        },
        {
          text: "Wagmi Contract Write With Feedback",
          link: "/recipes/WagmiContractWriteWithFeedback",
        },
        {
          text: "Add Custom Chain",
          link: "/recipes/add-custom-chain",
        },
      ],
    },
    {
      text: "🛳 Deploying",
      items: [
        {
          text: "Deploy Smart Contracts",
          link: "/deploying/deploy-smart-contracts",
        },
        {
          text: "Deploy Next.js App",
          link: "/deploying/deploy-nextjs-app",
        },
      ],
    },
    {
      text: "✅ Disable Type & Linting Error Checks",
      link: "/disable-type-linting-error-checks",
    },
    {
      text: "🔌 Extensions",
      items: [
        {
          text: "Overview",
          link: "/extensions",
        },
        {
          text: "How to Install",
          link: "/extensions/howToInstall",
        },
        {
          text: "Create Extensions",
          link: "/extensions/createExtensions",
        },
      ],
    },
    {
      text: "🤖 Build with AI",
      items: [
        {
          text: "Overview",
          link: "/build-with-ai",
        },
        {
          text: "AGENTS.md",
          link: "/build-with-ai/agents-md",
        },
        {
          text: "Skills",
          link: "/build-with-ai/skills",
          items: skillSidebarItems,
        },
      ],
    },
    {
      text: "🙏 Contributing",
      items: [
        {
          text: "Overview",
          link: "/contributing",
        },
        {
          text: "Issues",
          link: "/contributing/Issues",
        },
        {
          text: "Pull Requests",
          link: "/contributing/pullRequests",
        },
      ],
    },
  ],
  editLink: {
    pattern:
      "https://github.com/scaffold-eth//se-2-docs/edit/main/docs/pages/:path",
    text: "Suggest changes to this page",
  },
});
