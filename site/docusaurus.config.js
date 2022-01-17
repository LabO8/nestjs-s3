// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NestJS S3 Module',
  tagline: 'Dinosaurs are cool',
  url: 'https://nestjs-s3.github.io',
  baseUrl: '/nestjs-s3/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'lab08',
  projectName: 'nestjs-s3', // Usually your repo name.
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        // Plugin options
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        readme: null,
        sidebar: {
          categoryLabel: 'API',
          position: 2,
          fullNames: true,
        },
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl: 'https://github.com/LabO8/nestjs-s3',
        },
        theme: 'github-wiki',
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'NestJS S3 module',
        logo: {
          alt: 'NestJS S3 module',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/',
            label: 'Docs',
          },
          {
            href: 'https://github.com/LabO8/nestjs-s3',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/',
              },
            ],
          },
          {
            title: 'Usefull links',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/LabO8/nestjs-s3',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
