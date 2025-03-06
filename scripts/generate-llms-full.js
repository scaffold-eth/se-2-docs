#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const generateLlmsTxt = require('./generate-llms-txt');

// Ensure the static directory exists
const staticDir = path.join(__dirname, '..', 'static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Define paths
const docsDir = path.join(__dirname, '..', 'docs');
const outputPath = path.join(staticDir, 'llms-full.txt');

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

// Generate the llms-full.txt file
generateLlmsTxt(docsDir, outputPath, headerContent)
  .then(() => {
    console.log(`Successfully generated ${outputPath}`);
  })
  .catch(err => {
    console.error('Error generating llms-full.txt:', err);
    process.exit(1);
  });
