import { defineConfig } from "vocs";

export default defineConfig({
  title: "🏗 Scaffold-ETH 2 | Docs",
  description: "Open-source toolkit for building dapps",
  logoUrl: "/img/logo.svg",
  iconUrl: "/img/favicon.png",
  baseUrl: "https://scaffold-eth-2-docs-git-vocs-buidlguidldao.vercel.app",
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
  socials: [
    {
      icon: "github",
      link: "https://github.com/scaffold-eth/scaffold-eth-2",
    },
    {
      icon: "github",
      link: "https://github.com/scaffold-eth/se2-docs",
      label: "Docs Repo",
    },
  ],
  editLink: {
    pattern:
      "https://github.com/scaffold-eth//se-2-docs/edit/main/docs/pages/:path",
    text: "Suggest changes to this page",
  },
});
