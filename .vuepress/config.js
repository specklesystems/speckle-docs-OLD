const { description } = require('../package')

module.exports = {
  base: '/',
  title: 'Speckle Docs',

  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#0480FB' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    //repo: 'https://github.com/specklesystems/speckle-docs/',
    editLinks: true,
    docsDir: '',
    editLinkText: '',
    sidebarDepth: 2,
    activeHeaderLinks: false,
    lastUpdated: true,
    logo: '/assets/logo-docs.png',
    nav: [
      {
        text: 'User Guide',
        link: '/user/',
      },
      {
        text: 'Developer Docs',
        link: '/dev/'
      },
      {
        text: 'Deep Dives',
        link: '/deep-dives/'
      },
      {
        text: 'Speckle Website',
        link: 'https://speckle.systems'
      }
    ],
    sidebar: {
      '/user/': [
        {
          title: 'Quickstart 🏃‍♀️',
          collapsable: false,
          children: [
            'quickstart'
          ]
        },
        {
          title: 'User Guide 🤷',
          collapsable: false,
          children: [
            '',
            'concepts',
            'manager',
            'web',
            'connectors',
            'interoperability'
          ]
        },
      ],
      '/dev/': [
        {
          title: 'Developer Docs 👩‍💻',
          collapsable: false,
          children: [
            '',
            'quickstart',
            'contributing',
            'code-of-conduct',
          ]
        },
        {
          title: 'Speckle Web 🌍',
          collapsable: false,
          children: [
            'web',
            'server',
            'frontend',
            'viewer'
          ]
        },
        {
          title: 'Speckle Sharp 🦈',
          collapsable: false,
          children: [
            'core',
            'transports',
            'kits',
            'objects',
          ]
        },
        {
          title: 'Connectors 🔌',
          collapsable: false,
          children: [
            'connectors',
            'dynamo',
            'grasshopper',
            'revit',
            'rhino',
            'desktopui'
          ]
        },
        {
          title: 'Speckle Py 🐍',
          collapsable: false,
          children: [
            'speckle-py'
          ]
        }
      ],
      '/deep-dives/': [
        {
          title: 'Deep Dives 🤿',
          collapsable: false,
          children: [
            '',
            'base',
            'decomposition',
            'kits',
            'transports',
            'apps-auth',
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      "vuepress-plugin-matomo",
      {
        'siteId': 5,
        'trackerUrl': "https://speckle.matomo.cloud/"
      },

    ]
  ]
}
