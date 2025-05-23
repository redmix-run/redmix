import type * as PresetClassic from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import type { PluginOptions } from '@easyops-cn/docusaurus-search-local'

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
  // ?
  title: 'Cedar Docs',
  // ?
  tagline:
    'Built on React, GraphQL, and Prisma, Cedar works with the components and development workflow you love, but with simple conventions and helpers to make your experience even better.',
  // ?
  url: 'https://cedar.run',
  baseUrl: '/redwood-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://redwoodjs.com/favicon.png',
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
      title: 'Cedar',
      logo: {
        alt: 'Cedar logo',
        src: 'https://d33wubrfki0l68.cloudfront.net/72b0d56596a981835c18946d6c4f8a968b08e694/82254/images/logo.svg',
        href: 'https://cedar.run/redwood-docs',
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
              href: 'https://discord.com/invite/redwoodjs',
            },
            {
              label: 'Discourse',
              href: 'https://community.redwoodjs.com/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/redwoodjs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'cedar.run',
              to: 'https://cedar.run/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/cedarjs/cedar',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Cedar. Built with Docusaurus.`,
    },
  } satisfies PresetClassic.ThemeConfig,
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
      } satisfies PluginOptions,
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
