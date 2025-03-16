const fs = require('fs');
const path = require('path');

// Function to recursively get all markdown files
function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Extract title from markdown content
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
  
  // Fallback to filename
  return null;
}

// Generate a URL from file path
function generateUrl(filePath) {
  const relativePath = path.relative(path.join(__dirname, 'docs'), filePath);
  const pathWithoutExt = relativePath.replace(/\.(md|mdx)$/, '');
  return `https://scaffold-eth.io/docs/${pathWithoutExt.replace(/\\/g, '/')}`;
}

// Clean up markdown content
function cleanContent(content) {
  // Remove frontmatter
  let cleaned = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  
  // Remove any duplicate first-level headings
  cleaned = cleaned.replace(/^#\s+.+\n/m, '');
  
  // Clean up excessive whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  return cleaned.trim();
}

// Main function to generate llms-full.txt
async function generateLLMsFullText() {
  try {
    // Get all markdown files from the docs directory
    const docsDir = path.join(__dirname, 'docs');
    const markdownFiles = getAllMarkdownFiles(docsDir);
    
    console.log(`Found ${markdownFiles.length} markdown files.`);
    
    // Read and concatenate all files
    let fullText = '';
    
    for (const filePath of markdownFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract title or use filename
      let title = extractTitle(content);
      if (!title) {
        const filename = path.basename(filePath, path.extname(filePath));
        title = filename.charAt(0).toUpperCase() + filename.slice(1).replace(/-/g, ' ');
      }
      
      // Generate URL
      const url = generateUrl(filePath);
      
      // Add title and source URL as header (Anthropic format)
      fullText += `# ${title}\nSource: ${url}\n\n`;
      
      // Add cleaned content
      fullText += cleanContent(content);
      fullText += '\n\n\n';
    }
    
    // Write to llms-full.txt
    fs.writeFileSync(path.join(__dirname, 'llms-full.txt'), fullText);
    console.log('Successfully generated llms-full.txt in Anthropic format');
  } catch (error) {
    console.error('Error generating llms-full.txt:', error);
  }
}

// Run the function
generateLLMsFullText();