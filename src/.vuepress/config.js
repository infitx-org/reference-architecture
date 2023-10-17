const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'ModusBox reference architecture',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  base: '/reference-architecture/',

  /**
   * Customize Markdown
   */
   markdown: {
    /// Options for markdown-it
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                // This is only for full CommonMark compatibility.
    breaks:       true,        // Convert '\n' in paragraphs into 
    langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                // useful for external highlighters.
    // linkify:      false,        // Autoconvert URL-like text to links
  
    /// Enable some language-neutral replacement + quotes beautification
    /// For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer:  true,
  
    /// Double + single quotes replacement pairs, when typographer enabled,
    /// and smartquotes on. Could be either a String or an Array.
    ///
    /// For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    /// and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    // quotes: '“”‘’',
  
    /// Highlighter function. Should return escaped HTML,
    /// or '' if the source string is not changed and should be escaped externally.
    /// If result starts with <pre... internal wrapper is skipped.
    // highlight: function (/*str, lang*/) { return ''; }
    
    extendMarkdown: md => {
      md.use(require('markdown-it'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-multimd-table'), {
        /// Options for markdown-it-multimd-table
        multiline:  true,
        rowspan:    true,
        headerless: true,
      })
    }
  },

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#00a3ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  theme: 'titanium',

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: 'Edit this page on GitHub',
    smoothScroll: true,
    logo: '/Modusbox_Logos_Modusbox_Horizontal_Blue.png',
    sidebarDepth: 1,
    lastUpdated: true,
    nav: [
      {
        text: 'NodeJS',
        link: '/nodeJS/',
      },
      {
        text: 'Apache Camel',
        link: '/ApacheCamel/'
      },
      {
        text: 'Terraform',
        link: '/Terraform/'
      }
    ],
    sidebar: [
        {
          title: 'Node.JS',
          path: '/NodeJS/',
          collapsable: false,
          sidebarDepth: 1, 
          children: [
            {
            title: "Development",
            path: '/NodeJS/development/',
            children :[
              '/NodeJS/development/building-good-containers',
              '/NodeJS/development/code-consistency',
              '/NodeJS/development/code-coverage',
              '/NodeJS/development/dependencies',
              '/NodeJS/development/mono-repository',
              '/NodeJS/development/npm-proxy',
              '/NodeJS/development/npm-publishing',
              '/NodeJS/development/protecting-code',
              '/NodeJS/development/secure-development-process',
              '/NodeJS/development/testing',
              '/NodeJS/development/typescript',
              {
                title: "NodeJS Tools",
                path: '/NodeJS/development/tools/',
                children :[
                  {
                    title: "Devspace",
                    path: '/NodeJS/development/tools/',
                    children :[
                      '/NodeJS/development/tools/devspace',
                      '/NodeJS/development/tools/devspace_config',
                      '/NodeJS/development/tools/devspace_script'
                  ]},
              ]}
            ]},
            {
              title: "Functional Components",
              path: '/NodeJS/functional-components/',
                children :[
                '/NodeJS/functional-components/auth',
                '/NodeJS/functional-components/data-caching',
                '/NodeJS/functional-components/databases',
                '/NodeJS/functional-components/graphql',
                '/NodeJS/functional-components/internationalization',
                '/NodeJS/functional-components/message-queuing',
                '/NodeJS/functional-components/nodejs-versions-images',
                '/NodeJS/functional-components/rest-api-development',
                '/NodeJS/functional-components/scaling-multi-threading',
                '/NodeJS/functional-components/static-assets',
                '/NodeJS/functional-components/template-engines',
                '/NodeJS/functional-components/webframework',
              ]
            },
            {
              title: "Operations",
              path: '/NodeJS/operations/',
                children :[
                    '/NodeJS/operations/distributed-tracing',
                    '/NodeJS/operations/failurehandling',
                    '/NodeJS/operations/healthchecks',
                    '/NodeJS/operations/logging',
                    '/NodeJS/operations/metrics',
                ]}
          ]  },
        {
          title: 'Apache Camel',
          path: '/ApacheCamel/',
          collapsable: false,
          sidebarDepth: 1, 
        },
        {
          title: 'Terraform',
          path: '/Terraform/',
          collapsable: false,
          sidebarDepth: 1,
          children :[
            '/Terraform/HashicorpVault',
            '/Terraform/Helm',
            '/Terraform/Kubernetes',
          ] 
        }
      ],
    
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
      ['container', {
        type: 'col-wrapper',
        defaultTitle: '',
      }],
      ['container', {
        type: 'col-full',
        defaultTitle: '',
      }],
      ['container', {
        type: 'col-half',
        defaultTitle: '',
      }],
      ['container', {
        type: 'col-third',
        defaultTitle: '',
      }],
    ]
}}
