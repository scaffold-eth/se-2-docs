import fs from "node:fs";
import path from "node:path";

const SKILLS_DIR = "docs/pages/build-with-ai";
const RAW_BASE =
  "https://raw.githubusercontent.com/scaffold-eth/scaffold-eth-2/main/.agents/skills";
const GITHUB_API =
  "https://api.github.com/repos/scaffold-eth/scaffold-eth-2/contents/.agents/skills";

export type Skill = {
  name: string;
  title: string;
  shortDesc: string;
};

async function getSkillNames(): Promise<string[]> {
  const res = await fetch(GITHUB_API);
  if (!res.ok) return [];
  const dirs = (await res.json()) as { name: string; type: string }[];
  return dirs.filter((d) => d.type === "dir").map((d) => d.name);
}

async function fetchAndWriteSkill(name: string): Promise<Skill | null> {
  const res = await fetch(`${RAW_BASE}/${name}/SKILL.md`);
  if (!res.ok) return null;

  const raw = await res.text();

  // Extract description from original frontmatter
  const descMatch = raw.match(/description:\s*"([^"]+)"/);
  const shortDesc = descMatch
    ? descMatch[1].split(". Use when")[0]
    : `${name} skill for Scaffold-ETH 2`;

  // Replace frontmatter with Vocs-compatible one
  const body = raw.replace(/^---[\s\S]*?---\n*/, "");

  fs.writeFileSync(
    path.join(SKILLS_DIR, `${name}.md`),
    `---\ntitle: "${name}"\ndescription: "${shortDesc}"\n---\n\n${body}`,
  );

  return { name, title: name, shortDesc };
}

function writeSkillsOverview(skills: Skill[]) {
  const rows = skills
    .map(
      (s) =>
        `| [**${s.title}**](/build-with-ai/${s.name}) | ${s.shortDesc} |`,
    )
    .join("\n");

  fs.writeFileSync(
    path.join(SKILLS_DIR, "skills.md"),
    `---
title: Skills
description: Reusable AI agent instructions for adding features to Scaffold-ETH 2.
---

# Skills

Skills are markdown files (\`SKILL.md\`) that contain detailed instructions for AI agents to add specific features to your Scaffold-ETH 2 project. Think of them as expert knowledge packaged into a format that AI agents can take inspiration from.

## How Skills work

Each skill covers prerequisites, implementation patterns, gotchas, and SE-2 integration details. Skills live in your project at \`.agents/skills/<name>/SKILL.md\`. Your AI agent reads them before implementing a feature, so it follows proven patterns instead of guessing.

## Available Skills

| Skill | What it does |
|-------|-------------|
${rows}

:::info
The orchestrator skill is hosted at [\`docs.scaffoldeth.io/SKILL.md\`](https://docs.scaffoldeth.io/SKILL.md) — the entry point AI agents use to scaffold a new SE-2 project.
:::

## Skills vs Extensions

| | Extensions | Skills |
|---|---|---|
| **When** | At project creation (\`npx create-eth@latest\`) | Anytime during development |
| **How** | CLI selection during scaffolding | AI agent reads and applies the instructions |
| **What** | Adds boilerplate files to your project | Guides the agent to implement features correctly |
| **Flexibility** | Fixed template output | Agent adapts to your existing code |

## Creating your own Skills

Add a \`SKILL.md\` in \`.agents/skills/<your-skill>/\` and reference it in your \`AGENTS.md\` Skills Index.
`,
  );
}

function readExistingSkills(): Skill[] | null {
  // If skills.md already exists, pages were already generated this run
  const skillsFile = path.join(SKILLS_DIR, "skills.md");
  if (!fs.existsSync(skillsFile)) return null;

  // Read sidebar info from existing files
  const files = fs
    .readdirSync(SKILLS_DIR)
    .filter(
      (f) => f.endsWith(".md") && !["skills.md", "agents-md.md"].includes(f),
    );

  if (files.length === 0) return null;

  return files.map((f) => {
    const name = f.replace(".md", "");
    return { name, title: name, shortDesc: "" };
  });
}

export async function fetchSkills(): Promise<Skill[]> {
  // Skip fetch if pages already exist (Vocs evaluates config multiple times)
  const existing = readExistingSkills();
  if (existing) return existing;

  fs.mkdirSync(SKILLS_DIR, { recursive: true });

  const names = await getSkillNames();
  const results = await Promise.all(names.map(fetchAndWriteSkill));
  const skills = results.filter(Boolean) as Skill[];

  if (skills.length > 0) {
    writeSkillsOverview(skills);
    console.log(`✅ Fetched ${skills.length} skills from GitHub`);
  }

  return skills;
}
