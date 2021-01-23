const { description } = require('../package')

module.exports = {
  base: '/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Speckle Docs',
  
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  theme: "book",
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
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
            '',
            'getting-started',
          ]
        }
      ],
      '/dev/': [
        {
          title: 'Developer Docs 👩‍💻',
          collapsable: false,
          children: [
            '',
            'speckle-sharp',
          ]
        }
      ],
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
