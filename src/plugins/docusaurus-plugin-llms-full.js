const fs = require("fs");
const path = require("path");

/** @type {import('@docusaurus/types').Plugin} */
function docusaurusPluginLLMsFull(context, options = {}) {
  const { siteDir } = context;
  const outputFile = options.outputFile || "llms-full.txt";

  // Function to recursively get all markdown files
  function getAllMarkdownFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        getAllMarkdownFiles(filePath, fileList);
      } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
        fileList.push(filePath);
      }
    });

    return fileList;
  }

  function extractTitle(content) {
    // Look for the first # heading
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1].trim();
    }

    // If no # heading, try to find a title in frontmatter
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const titleInFrontmatter = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
      if (titleInFrontmatter && titleInFrontmatter[1]) {
        return titleInFrontmatter[1].trim();
      }
    }

    return null;
  }

  function generateUrl(filePath) {
    const relativePath = path.relative(path.join(siteDir, "docs"), filePath);
    const pathWithoutExt = relativePath.replace(/\.(md|mdx)$/, "");
    return `${context.siteConfig.url}/docs/${pathWithoutExt.replace(/\\/g, "/")}`;
  }

  function cleanContent(content) {
    // Remove frontmatter
    let cleaned = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");

    // Remove any duplicate first-level headings
    cleaned = cleaned.replace(/^#\s+.+\n/m, "");

    // Clean up excessive whitespace
    cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

    return cleaned.trim();
  }

  async function generateContent() {
    try {
      const docsDir = path.join(siteDir, "docs");
      const markdownFiles = getAllMarkdownFiles(docsDir);
      let fullText = "";

      for (const filePath of markdownFiles) {
        const content = fs.readFileSync(filePath, "utf8");

        // Extract title or use filename
        let title = extractTitle(content);
        if (!title) {
          const filename = path.basename(filePath, path.extname(filePath));
          title = filename.charAt(0).toUpperCase() + filename.slice(1).replace(/-/g, " ");
        }

        const url = generateUrl(filePath);

        // Add title and source URL as header (Anthropic format)
        fullText += `# ${title}\nSource: ${url}\n\n`;

        fullText += cleanContent(content);
        fullText += "\n\n\n";
      }
      const staticDir = path.join(siteDir, "static");

      fs.writeFileSync(path.join(staticDir, outputFile), fullText);
      console.log(`Successfully generated ${outputFile} in static folder`);

      return { success: true };
    } catch (error) {
      console.error(`Error generating ${outputFile}:`, error);
      return { success: false, error: error.message };
    }
  }

  return {
    name: "docusaurus-plugin-llms-full",
    async loadContent() {
      try {
        await generateContent();
        return { success: true };
      } catch (error) {
        console.error("Error in loadContent:", error);
        return { success: false, error: error.message };
      }
    },
    async contentLoaded({ actions, content }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
}

module.exports = docusaurusPluginLLMsFull;
