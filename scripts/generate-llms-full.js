#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { generateLlmsTxt, DEFAULT_HEADER_CONTENT } = require("./generate-llms-txt");

console.log("📝 Generating llms-full.txt file for LLM context...");

// Ensure the static directory exists
const staticDir = path.join(__dirname, "..", "static");
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Define paths
const docsDir = path.join(__dirname, "..", "docs");
const outputPath = path.join(staticDir, "llms-full.txt");

// Check if docs directory exists
if (!fs.existsSync(docsDir)) {
  console.error(`❌ Error: Docs directory does not exist: ${docsDir}`);
  process.exit(1);
}

// Generate the llms-full.txt file
generateLlmsTxt(docsDir, outputPath, DEFAULT_HEADER_CONTENT)
  .then(() => {
    // Verify the file was created
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`✅ Generated llms-full.txt (${Math.round(stats.size / 1024)} KB)`);
    } else {
      console.error(`❌ Failed to generate llms-full.txt`);
    }
  })
  .catch(err => {
    console.error("❌ Error generating llms-full.txt:", err.message);
    process.exit(1);
  });
