import { defineConfig } from "vocs";

export default defineConfig({
  title: "🏗 Scaffold-ETH 2 | Docs",
  description: "Open-source toolkit for building dapps",
  logoUrl: "/img/logo.svg",
  iconUrl: "/img/favicon.png",
  vite: {
    publicDir: "docs/public",
  },
  sidebar: [
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
          link: "/components/IntergerInput",
        },
        {
          text: "RainbowKitCustomConnectButton",
          link: "/components/RainbowKitCustomConnectButton",
        },
      ],
    },
    {
      text: "🔌 Hooks",
      items: [
        {
          text: "Hooks Overview",
          link: "/hooks/hooks",
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
          text: "useScaffoldEventHistory",
          link: "/hooks/useScaffoldEventHistory",
        },
        {
          text: "useScaffoldReadContract",
          link: "/hooks/useScaffoldReadContract",
        },
        {
          text: "useScaffoldWatchContractEvent",
          link: "/hooks/useScaffoldWatchContractEvent",
        },
        {
          text: "useScaffoldWriteContract",
          link: "/hooks/useScaffoldWriteContract",
        },
        {
          text: "useTransactor",
          link: "/hooks/useTransactor",
        },
      ],
    },
    {
      text: "🧪 Recipes",
      items: [
        {
          text: "Get Current Balance From Account",
          link: "/recipes/GetCurrentBalanceFromAccount",
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
          text: "Write To Contract Write Async Button",
          link: "/recipes/WriteToContractWriteAsyncButton",
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
          text: "Deploy Next.js App",
          link: "/deploying/deploy-nextjs-app",
        },
        {
          text: "Deploy Smart Contracts",
          link: "/deploying/deploy-smart-contracts",
        },
      ],
    },
    {
      text: "📡 External Contracts",
      link: "/external-contracts/external-contracts",
    },
    {
      text: "🔌 Extensions",
      items: [
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
          text: "Issues",
          link: "/contributing/Issues",
        },
        {
          text: "Pull Requests",
          link: "/contributing/pullRequests",
        },
        {
          text: "Contributing",
          link: "/contributing/contributing",
        },
      ],
    },
    {
      text: "✅ Disable Type & Linting Error Checks",
      link: "/disable-type-linting-error-checks",
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
  topNav: [
    {
      text: "Documentation",
      link: "/",
      match: "/",
    },
  ],
});
