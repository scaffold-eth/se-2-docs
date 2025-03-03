// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "🏗 Scaffold-ETH 2 | Docs",
  tagline: "Open-source toolkit for building dapps",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://docs.scaffoldeth.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "scaffold-eth",
  projectName: "scaffold-eth-2",
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexBlog: false,
        includeParentCategoriesInPageTitle: true,
      },
    ],
  ],
  scripts: [
    {
      src: "https://plausible.io/js/plausible.js",
      async: true,
      defer: true,
      "data-domain": "docs.scaffoldeth.io",
    },
  ],

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // sidebarCollapsible: false,
          sidebarCollapsed: true,
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/scaffold-eth/se2-docs/edit/main/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      colorMode: {
        respectPrefersColorScheme: true,
      },
      image: "img/thumbnail.jpg",
      navbar: {
        title: "Scaffold-ETH 2 | Docs",
        logo: {
          alt: "scaffold-eth-logo",
          src: "img/logo.svg",
        },
        items: [
          // commented until Scaffold-eth 2 website is launched
          // {
          //   href: 'https://scaffoldeth.io/',
          //   label: 'SE-2 Website',
          //   position: 'left',
          // },
          {
            href: "https://github.com/scaffold-eth/se2-docs",
            label: "GitHub Docs",
            position: "right",
          },
          {
            href: "https://github.com/scaffold-eth/scaffold-eth-2",
            label: "GitHub SE-2",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Built with ♥ at BuidlGuidl",
            items: [
              {
                label: "BuidlGuidl Website",
                to: "https://buidlguidl.com/",
              },
              {
                label: "BuidlGuidl Twitter",
                to: "https://twitter.com/buidlguidl",
              },
            ],
          },
          {
            title: "GitHub",
            items: [
              {
                label: "Scaffold-Eth 2 GitHub",
                href: "https://github.com/scaffold-eth/scaffold-eth-2",
              },
              {
                label: "Docs GitHub",
                href: "https://github.com/scaffold-eth/se2-docs",
              },
            ],
          },
          {
            title: "Social",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/ScaffoldETH",
              },
              {
                label: "Telegram",
                href: "https://t.me/joinchat/F7nCRK3kI93PoCOk",
              },
              {
                label: "Youtube",
                href: "https://www.youtube.com/@austingriffith3550/playlists",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Scaffold-eth Docs. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
