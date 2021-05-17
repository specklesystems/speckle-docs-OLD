const { description } = require("../package")

module.exports = {
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      // use more markdown-it plugins!
      md.use(require("markdown-it-html5-embed"), {
        html5embed: {
          useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default)
          useLinkSyntax: true // Enables video/audio embed with []() syntax
        }
      })
    }
  },
  base: "/",
  title: "Speckle Docs",

  description: description,
  head: [
    ["meta", { name: "theme-color", content: "#0480FB" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "script",
      {
        src: "/scripts/scroll-to-hash.js"
      }
    ]
  ],
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "specklesystems/speckle-docs/",
    docsBranch: "main",
    editLinks: true,
    editLinkText: "Edit this page",
    docsDir: "",
    sidebarDepth: 2,
    activeHeaderLinks: false,
    lastUpdated: true,
    logo: "/assets/logo-docs.png",
    nav: [
      {
        text: "User Guide",
        link: "/"
      },
      {
        text: "Developer Docs",
        link: "/dev/"
      },
      {
        text: "Speckle Website",
        link: "https://speckle.systems"
      },
      //this button has custom style in index.styl under `.nav-item:last-child a`
      {
        text: "Join the beta",
        link: "https://speckle.systems/getstarted/"
      }
    ],
    sidebar: {
      "/user/": [
        {
          title: "Quickstart 🏃‍♀️",
          collapsable: false,
          children: ["quickstart", "FAQs"]
        },
        {
          title: "User Guide 🤷",
          collapsable: false,
          children: ["", "concepts", "concepts-advanced", "manager", "web"]
        },
        {
          title: "Connectors 🔌",
          collapsable: false,
          children: [
            "connectors",
            "ui",
            "revit",
            "rhino",
            "autocadcivil",
            "grasshopper",
            "dynamo",
            "unity",
            "unreal",
            "blender"
          ]
        },
        {
          title: "Tutorials ⚡",
          collapsable: false,
          children: [
            "tutorials",
            "interop-gh-revit",
            "interop-revit-gh",
            "interop-rhino-revit",
            "tutorial-autocad-rhinogh",
            "tutorial-unity-revit-rhino-experiences",
            "tutorial-collab-rh-gh"
          ]
        }
      ],
      "/dev/": [
        {
          title: "Developer Docs 👩‍💻",
          collapsable: false,
          children: ["", "architecture"]
        },
        {
          title: "Core Concepts",
          collapsable: false,
          children: ["base", "decomposition", "kits", "transports", "apps-auth"]
        },
        {
          title: ".NET SDK",
          collapsable: false,
          children: ["dotnet", "objects", "connectors-dev", "kits-dev", "transports-dev"]
        },
        {
          title: "Python SDK",
          collapsable: false,
          children: ["python", "py-examples", "py-sample"]
        },
        {
          title: "Javascript SDK",
          collapsable: false,
          children: ["js", "viewer", "js-app-script"]
        },
        {
          title: "Server API & Apps",
          collapsable: false,
          children: ["server-api", "server-setup", "tokens", "apps"]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    [
      "vuepress-plugin-matomo",
      {
        siteId: 5,
        trackerUrl: "https://speckle.matomo.cloud/"
      }
    ]
  ]
}
