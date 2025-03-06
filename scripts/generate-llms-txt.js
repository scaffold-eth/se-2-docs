const fs = require("fs");
const path = require("path");

/**
 * Generate a llms-full.txt file containing all documentation content
 * @param {string} docsDir - Path to the docs directory
 * @param {string} outputPath - Path where the llms-full.txt file will be saved
 * @param {string} headerContent - Content to include at the top of the file
 */
async function generateLlmsTxt(docsDir, outputPath, headerContent) {
  // Array to store all markdown content
  const allContent = [];

  // Add the header content
  allContent.push(headerContent);

  // Get all directories in the docs folder
  const docDirs = await getFolders(docsDir);

  // Process each directory
  for (const dirName of docDirs) {
    if (dirName === "") {
      // Process files in the root docs directory
      const rootFiles = await getMdFiles(docsDir);
      for (const filePath of rootFiles) {
        // Skip if the file is not directly in the docs directory
        if (path.dirname(filePath) !== docsDir) {
          continue;
        }

        const fileName = path.basename(filePath, path.extname(filePath));
        if (fileName === "intro") {
          continue; // Skip intro file as it's likely covered in the header
        }

        await processFile(filePath, docsDir, allContent, "###");
      }
      continue;
    }

    const dirPath = path.join(docsDir, dirName);

    // Skip if it's not a directory
    if (!(await fs.promises.stat(dirPath)).isDirectory()) {
      continue;
    }

    // Format directory name for title (capitalize first letter)
    const formattedDirName = dirName.charAt(0).toUpperCase() + dirName.slice(1);

    // Get folder description from _category_.json or same-name markdown file
    let folderDescription = await getFolderDescription(dirPath, dirName);

    // Add folder title
    allContent.push(`## ${formattedDirName}`);

    // Add folder description if available
    if (folderDescription) {
      allContent.push(folderDescription);
    }

    // Get all markdown files in the directory (non-recursive)
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const mdFiles = entries
      .filter(entry => !entry.isDirectory() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")))
      .map(entry => path.join(dirPath, entry.name));

    // Skip the file with the same name as the directory (already used for folder description)
    const filteredMdFiles = mdFiles.filter(filePath => {
      const fileName = path.basename(filePath, path.extname(filePath));
      return fileName.toLowerCase() !== dirName.toLowerCase();
    });

    // Process each markdown file
    for (const filePath of filteredMdFiles) {
      await processFile(filePath, docsDir, allContent, "###");
    }
  }

  // Write concatenated content to file
  await fs.promises.writeFile(outputPath, allContent.join("\n\n"));
}

/**
 * Process a markdown file and add its content to the allContent array
 * @param {string} filePath - Path to the markdown file
 * @param {string} docsDir - Path to the docs directory
 * @param {string[]} allContent - Array to store all content
 * @param {string} titlePrefix - Prefix for the title (## or ###)
 */
async function processFile(filePath, docsDir, allContent, titlePrefix) {
  // Read file content
  let content = await fs.promises.readFile(filePath, "utf8");

  // Extract title from the file name if not found in frontmatter
  const fileName = path.basename(filePath, path.extname(filePath));
  let title = fileName;

  // Check for frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (frontmatterMatch) {
    // Extract title from frontmatter if it exists
    const titleMatch = frontmatterMatch[1].match(/title:\s*["']?([^"'\n]+)["']?/);
    if (titleMatch) {
      title = titleMatch[1];
    }

    // Remove the entire frontmatter block
    content = content.replace(/^---\n[\s\S]*?\n---\n/, "");
  }

  // Get the relative path for URL construction
  const relativePath = path.relative(docsDir, filePath);

  // Convert file path to URL path
  let urlPath = relativePath.replace(/\.mdx?$/, "");

  // Construct the full URL
  const fullUrl = `https://docs.scaffoldeth.io/${urlPath.replace(/\\/g, "/")}`;

  // Process content

  // 1. Remove any additional frontmatter-like sections (sidebar_position, etc.)
  content = content.replace(/^---\n[\s\S]*?---\n/gm, "");

  // 2. Remove the title if it starts with # (could be # Title or # title)
  content = content.replace(/^#\s+.*?\n+/i, "");

  // 3. Process the content line by line to adjust heading levels
  const lines = content.split("\n");
  const processedLines = [];

  let foundFirstHeading = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip any remaining frontmatter-like lines
    if (line.trim() === "---") {
      // Check if this is the start of a frontmatter block
      let j = i + 1;
      let isFrontmatter = false;

      // Look ahead to see if there's a closing --- within a reasonable distance
      while (j < lines.length && j < i + 20) {
        if (lines[j].trim() === "---") {
          isFrontmatter = true;
          break;
        }
        j++;
      }

      if (isFrontmatter) {
        // Skip this frontmatter block
        i = j;
        continue;
      }
    }

    // Process headings
    if (/^#{1,6}\s/.test(line)) {
      // Count the number of # at the start
      const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headingMatch) {
        const headingLevel = headingMatch[1].length;
        const headingText = headingMatch[2];

        // Check if this is a duplicate of our title
        if (!foundFirstHeading && headingLevel === 1 && headingText.trim().toLowerCase() === title.toLowerCase()) {
          // Skip this line as it's a duplicate of our title
          foundFirstHeading = true;
          continue;
        }

        // For our custom heading structure:
        // If our title is ### (3 #'s), then:
        // - ## in content becomes #### (level+1)
        // - ### in content becomes #### (level+1)
        // - #### in content becomes ##### (level+1)
        // This ensures proper nesting while keeping a clean hierarchy

        let newLevel;
        if (titlePrefix === "###") {
          // For document headings (###)
          if (headingLevel <= 2) {
            newLevel = 4; // ## becomes ####
          } else {
            newLevel = headingLevel + 1;
          }
        } else if (titlePrefix === "##") {
          // For section headings (##)
          if (headingLevel <= 1) {
            newLevel = 3; // # becomes ###
          } else {
            newLevel = headingLevel + 1;
          }
        } else {
          newLevel = headingLevel + titlePrefix.length;
        }

        // Ensure we don't exceed 6 #'s (maximum heading level in markdown)
        const adjustedLevel = Math.min(newLevel, 6);

        // Create the new heading
        processedLines.push("#".repeat(adjustedLevel) + " " + headingText);
        continue;
      }
    }

    // Add the line as is if it's not a heading
    processedLines.push(line);
  }

  // Join the processed lines back together
  let processedContent = processedLines.join("\n");

  // Trim leading and trailing whitespace
  processedContent = processedContent.trim();

  // Combine title and content with URL (with controlled spacing)
  const finalContent = `${titlePrefix} ${title}\n\nSource: ${fullUrl}\n\n${processedContent}`;

  allContent.push(finalContent);
}

/**
 * Get all folders in a directory
 * @param {string} dir - Directory path
 * @returns {Promise<string[]>} - Array of folder names
 */
async function getFolders(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const folders = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

  // Add root folder for files directly in the docs directory
  folders.unshift("");

  return folders;
}

/**
 * Get folder description from _category_.json or same-name markdown file
 * @param {string} dirPath - Directory path
 * @param {string} dirName - Directory name
 * @returns {Promise<string|null>} - Folder description or null if not found
 */
async function getFolderDescription(dirPath, dirName) {
  // Check for _category_.json
  const categoryPath = path.join(dirPath, "_category_.json");
  if (await fileExists(categoryPath)) {
    try {
      const categoryContent = await fs.promises.readFile(categoryPath, "utf8");
      const categoryData = JSON.parse(categoryContent);

      // Check for description in different possible locations
      if (categoryData.description) {
        return categoryData.description;
      } else if (categoryData.link && categoryData.link.description) {
        return categoryData.link.description;
      }
    } catch (error) {
      console.warn(`Error reading _category_.json in ${dirPath}: ${error.message}`);
    }
  }

  // Check for same-name markdown file
  const mdPath = path.join(dirPath, `${dirName}.md`);
  const mdxPath = path.join(dirPath, `${dirName}.mdx`);

  if (await fileExists(mdPath)) {
    return processFolderMarkdownFile(mdPath);
  } else if (await fileExists(mdxPath)) {
    return processFolderMarkdownFile(mdxPath);
  }

  return null;
}

/**
 * Process a markdown file to be used as a folder description
 * @param {string} filePath - Path to the markdown file
 * @returns {Promise<string>} - Processed content
 */
async function processFolderMarkdownFile(filePath) {
  // Read file content
  let content = await fs.promises.readFile(filePath, "utf8");

  // Remove frontmatter
  content = content.replace(/^---\n[\s\S]*?\n---\n/, "");

  // Process the content line by line to adjust heading levels
  const lines = content.split("\n");
  const processedLines = [];

  let foundFirstHeading = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip any remaining frontmatter-like lines
    if (line.trim() === "---") {
      // Check if this is the start of a frontmatter block
      let j = i + 1;
      let isFrontmatter = false;

      // Look ahead to see if there's a closing --- within a reasonable distance
      while (j < lines.length && j < i + 20) {
        if (lines[j].trim() === "---") {
          isFrontmatter = true;
          break;
        }
        j++;
      }

      if (isFrontmatter) {
        // Skip this frontmatter block
        i = j;
        continue;
      }
    }

    // Process headings - increase level by 1 (# becomes ##, ## becomes ###, etc.)
    if (/^#{1,6}\s/.test(line)) {
      // Count the number of # at the start
      const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headingMatch) {
        const headingLevel = headingMatch[1].length;
        const headingText = headingMatch[2];

        // For the first heading, we want to ensure it's at level 3 (###)
        // This is because it will be under a level 2 (##) folder heading
        let newLevel;
        if (!foundFirstHeading) {
          newLevel = 3; // First heading should be ###
          foundFirstHeading = true;
        } else {
          // For subsequent headings, increase by 1 from their original level
          newLevel = Math.min(headingLevel + 1, 6);
        }

        // Create the new heading
        processedLines.push("#".repeat(newLevel) + " " + headingText);
        continue;
      }
    }

    // Add the line as is if it's not a heading
    processedLines.push(line);
  }

  // Join the processed lines back together
  let processedContent = processedLines.join("\n");

  // Trim leading and trailing whitespace
  processedContent = processedContent.trim();

  return processedContent;
}

/**
 * Extract description from markdown content
 * @param {string} content - Markdown content
 * @returns {string} - Extracted description
 */
function extractDescription(content) {
  // Remove frontmatter
  const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, "");

  // Remove title
  const contentWithoutTitle = contentWithoutFrontmatter.replace(/^#\s+.*?\n+/i, "");

  // Get first paragraph as description
  const paragraphs = contentWithoutTitle.split("\n\n");
  for (const paragraph of paragraphs) {
    if (paragraph.trim() && !paragraph.startsWith("#") && !paragraph.startsWith("![")) {
      return paragraph.trim();
    }
  }

  return "";
}

/**
 * Check if a file exists
 * @param {string} filePath - File path
 * @returns {Promise<boolean>} - True if file exists, false otherwise
 */
async function fileExists(filePath) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all markdown files in a directory and its subdirectories
 * @param {string} dir - Directory path
 * @returns {Promise<string[]>} - Array of file paths
 */
async function getMdFiles(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return getMdFiles(fullPath);
      } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
        return [fullPath];
      } else {
        return [];
      }
    }),
  );

  return files.flat();
}

// If this script is run directly
if (require.main === module) {
  const docsDir = path.join(__dirname, "..", "docs");
  const outputPath = path.join(__dirname, "..", "static", "llms-full.txt");

  // Read header content from a file or use a default
  const headerContent = `# Scaffold-ETH 2

Everything you need to build dApps on Ethereum. A modern, clean version of Scaffold-ETH with NextJS, RainbowKit, Wagmi and Typescript. Supports Hardhat and Foundry.

## High level overview

### Core Interaction Patterns

Smart Contract Operations:

- Read: useScaffoldReadContract (packages/nextjs/hooks/scaffold-eth/useScaffoldReadContract.ts)
- Write: useScaffoldWriteContract (packages/nextjs/hooks/scaffold-eth/useScaffoldWriteContract.ts)
- Transactions: useTransactor (packages/nextjs/hooks/scaffold-eth/useTransactor.ts)

### UI/Design System

Styling Framework:

- Base: Tailwind CSS v3
- Components: daisyUI v4
- DaisyUI Documentation: https://daisyui.com/llms.txt
- Implementation:
  * Core theme configuration: packages/nextjs/tailwind.config.js
  * Base styling: packages/nextjs/styles/globals.css
  * Component-specific styling in individual component files

Design Patterns:
- Responsive layouts using Tailwind's mobile-first approach
- Semantic color system via daisyUI themes
- Consistent component styling through shared class structures

### Authentication Model

Wallet Connection:

- Supported: RainbowKit (packages/nextjs/providers/RainbowKitProvider.tsx)
- Protocols: WalletConnect, Coinbase, Injected
- Session: Persisted via localStorage

### Error Handling in Scaffold-ETH 2

Scaffold-ETH 2 uses a straightforward approach to error handling focused on developer experience and debugging.

#### Error Handling Patterns

##### Contract Interaction Errors
Contract calls use try/catch blocks to handle errors, with results logged to console:

// Code snippet here (using try/catch)

##### Pre-condition Checks
Validation is performed before operations:

// Code snippet here (using conditional checks)

#### Common Error Scenarios
| Scenario | Handling Approach |
|----------|-------------------|
| Smart contract call failures | Try/catch with console error |
| Missing contract instances | Conditional checks before operations |
| Network connectivity issues | Handled by wagmi/viem underneath |
| Invalid input values | Component-level validation |

#### Current Limitations
- No formalized error schema or custom error types
- Errors handled locally rather than centrally
- Limited user-facing error feedback
- No application-level error state management

#### Error Flow
1. Operation attempted → 2. Local error handling → 3. Console logging → 4. UI may or may not update

#### Best Practices
1. Wrap contract interactions in try/catch blocks
2. Provide meaningful error messages
3. Implement proper validation
4. Consider how errors should be displayed to users

### Deployment Configuration

Network Setup:

- Chains: Can be defined directly in scaffold.config.ts or in a separate file (e.g., packages/nextjs/utils/customChains.ts)
- Targets: Configured in packages/nextjs/scaffold.config.ts via the targetNetworks array
- RPC: Can be hardcoded in chain definitions or configured via .env.local

Example Chain Config:
// In scaffold.config.ts or a separate file
export const lineaSepolia = defineChain({
  id: 59_141,
  name: "Linea Sepolia Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.linea.build"],
      webSocket: ["wss://rpc.sepolia.linea.build"], // WebSocket is optional but recommended
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.lineascan.build",
      apiUrl: "https://api-sepolia.lineascan.build/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 227427,
    },
  },
  testnet: true,
});

### Best Practice Guidance

1. Use Address or AddressInput for all address fields (depending if it's read-only or the user inputs the values)
2. Wrap writes in useTransactor for UI feedback
3. Prefer Balance over direct ethers.js calls
4. Use scaffold.config.ts for network selection

### Performance Considerations

- State Management: Use useScaffoldContract for contract instances
- Event Listening: useScaffoldEventHistory for historical data
- Caching: SWR for balance/address info

### Security Model

- Wallet Isolation: Per-session connection
- Error Boundaries: packages/nextjs/components/ErrorBoundary.tsx
- Sanitization: AddressInput validation regex

### Example Flows

1. Send Transaction Flow:
   AddressInput → EtherInput → useScaffoldWriteContract → useTransactor

2. Balance Display Flow:
   useAccount → Balance → Refresh on block

3. Contract Read Flow:
   useScaffoldReadContract → display loading/error/data`;

  generateLlmsTxt(docsDir, outputPath, headerContent).catch(err => {
    console.error("Error generating llms-full.txt:", err);
    process.exit(1);
  });
}

module.exports = generateLlmsTxt;
