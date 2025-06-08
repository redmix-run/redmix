import type * as PresetClassic from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import type { PluginOptions as SearchLocalPluginOptions } from '@easyops-cn/docusaurus-search-local'
import type { PluginOptions as LlmsTxtPluginOptions } from '@signalwire/docusaurus-plugin-llms-txt'

import autoImportTabs from './src/remark/auto-import-tabs.mjs'
import fileExtSwitcher from './src/remark/file-ext-switcher.mjs'

const config: Config = {
  customFields: {
    defaultDocsLandingPage: 'index', // redirects here when hitting /docs/
    defaultSectionLandingPages: {
      // map of what is considered the first article in each section
      // section: id
      tutorial: 'forward',
    },
  },
  title: 'CedarJS Docs',
  tagline: 'The React + GraphQL Web App Framework',
  url: 'https://cedarjs.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  organizationName: 'cedarjs', // Usually your GitHub org/user name.
  // ?
  projectName: 'cedar', // Usually your repo name.,
  themeConfig: {
    algolia: {
      appId: '__37B3LHULK0',
      apiKey: '__1d7f2f299d9a38c157501c301425f090',
      indexName: 'learn-cedar',
      contextualSearch: true,
      searchParameters: {},
      // externalUrlRegex: 'https://learn-redwood.netlify.app',
    },
    navbar: {
      title: 'CedarJS',
      logo: {
        alt: 'CedarJS logo',
        src: 'https://avatars.githubusercontent.com/u/211931789?s=200&v=4',
        href: 'https://cedarjs.com',
        target: '_self',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'left',
        },
        {
          href: 'https://github.com/cedarjs/cedar',
          position: 'right',
          className: 'github-logo',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    prism: {
      additionalLanguages: ['toml', 'diff', 'bash', 'json'],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: 'docs/tutorial/foreword',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/8mNkAgby5m',
            },
            // {
            //   label: 'Discourse',
            //   href: 'https://community.redwoodjs.com/',
            // },
            {
              label: 'Twitter/X',
              href: 'https://x.com/cedarjs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'cedarjs.com',
              to: 'https://cedarjs.com/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/cedarjs/cedar',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CedarJS. Built with Docusaurus.`,
    },
  } satisfies PresetClassic.ThemeConfig,
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
      } satisfies SearchLocalPluginOptions,
    ],
  ],
  plugins: [
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        depth: 2,
        logLevel: 1,
        content: {
          excludeRoutes: [
            '/canary/**',
            '/docs/0.0.*/**',
            '/docs/8.*/**',
            '/search',
          ],
          enableMarkdownFiles: true,
        },
      } satisfies LlmsTxtPluginOptions,
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // ? — blob? tree?
          editUrl: 'https://github.com/cedarjs/cedar/blob/main/docs', // base path for repo edit pages
          editCurrentVersion: true,
          remarkPlugins: [autoImportTabs, fileExtSwitcher],
          versions: {
            current: {
              label: 'Canary',
              path: 'canary',
              banner: 'unreleased',
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies PresetClassic.Options,
    ],
  ],
  // ?
  // scripts: [
  //   {
  //     src: 'https://plausible.io/js/script.outbound-links.tagged-events.js',
  //     defer: true,
  //     'data-domain': 'docs.redwoodjs.com',
  //   },
  // ],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;900&display=swap',
  ],
}

export default config
