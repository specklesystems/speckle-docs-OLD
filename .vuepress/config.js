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
        items: [
          {
            text: 'Getting Started',
            link: '/dev/getting-started/',
          },
          {
            text: 'Desktop & SDKs', 
            items: [
              {text: 'Speckle Sharp 🦈', link: '/dev/speckle-sharp/'},
              {text: 'Speckle Py 🐍', link: '/dev/speckle-py/'}
            ]
          },
          {
            text: 'Web',
            items: [
              {text: 'Server', link: '/dev/server/'},
              {text: 'Frontend', link: '/dev/frontend/'},
              {text: '3D Viewer', link: '/dev/viewer/'}
            ]
          },
        ]
      },
      {
        text: 'Speckle Website',
        link: 'https://speckle.systems'
      }
    ],
    sidebar: {
      '/user/': [
        {
          title: 'User Guide 🤷',
          collapsable: false,
          children: [
            ''
          ]
        }
      ],
      '/dev/getting-started/': [
        {
          title: 'Developer Docs 👩‍💻',
          collapsable: false,
          children: [
            '',
            'contributing',
            'code-of-conduct',
          ]
        }
      ],
      '/dev/speckle-sharp/': [
        {
          title: 'Speckle Sharp 🦈',
          collapsable: false,
          children: [
            ''
          ]
        },
        {
          title: 'Core 🎱',
          collapsable: false,
          children: [
            'core',
            'transports'
          ]
        },
        {
          title: 'Kits 🛠',
          collapsable: false,
          children: [
            'kits',
            'objects'
          ]
        },
        {
          title: 'Connectors 🔌',
          collapsable: false,
          children: [
            'dynamo',
            'grasshopper',
            'revit',
            'rhino'
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
  ]
}
