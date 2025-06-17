const path = require("path");
const fs = require("fs");
const { generateLlmsTxt, DEFAULT_HEADER_CONTENT } = require("./generate-llms-txt");

/**
 * Docusaurus plugin to generate llms-full.txt file during build
 * @returns {import('@docusaurus/types').Plugin}
 */
module.exports = function llmsTxtPlugin(context, options) {
  return {
    name: "llms-txt-plugin",
    async postBuild({ outDir }) {
      if (!outDir) {
        console.error("❌ Error: Output directory is undefined");
        return;
      }

      console.log("📝 Generating llms-full.txt file for LLM context...");

      try {
        // Define paths
        const docsDir = path.join(context.siteDir, "docs");
        const outputPath = path.join(outDir, "llms-full.txt");

        // Check if docs directory exists
        if (!fs.existsSync(docsDir)) {
          console.error(`❌ Error: Docs directory does not exist: ${docsDir}`);
          return;
        }

        // Generate the llms-full.txt file in build directory
        await generateLlmsTxt(docsDir, outputPath, DEFAULT_HEADER_CONTENT);

        // Verify the file was created
        if (fs.existsSync(outputPath)) {
          const stats = fs.statSync(outputPath);
          console.log(`✅ Generated llms-full.txt (${Math.round(stats.size / 1024)} KB)`);
          console.log(`   This file will be accessible at: https://docs.scaffold-eth.io/llms-full.txt`);
        } else {
          console.error(`❌ Failed to generate llms-full.txt`);
        }
      } catch (err) {
        console.error("❌ Error generating LLM file:", err.message);
      }
    },
  };
};
