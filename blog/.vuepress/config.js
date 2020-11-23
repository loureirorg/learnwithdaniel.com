module.exports = {
  title: 'Learn with Daniel - A learner diary',
  description: 'A learner diary',
  head: [
    ['link', { rel: 'icon', href: '/favicon-128.png' }]
  ],
  postcss: {
    plugins: [
      require('tailwindcss')(),
      require('autoprefixer'),
    ]
  },
  plugins: [
    'reading-progress',
    'vuepress-plugin-reading-time',
    [
      '@goy/svg-icons', {
        svgsDir: '.vuepress/icons',
      }
    ],
    [
      '@vuepress/blog', {
        directories: [
          {
            id: 'post',
            dirname: '_posts',
            path: '/',
            itemPermalink: '/:year/:month/:slug',
            pagination: {
              lengthPerPage: 10,
            },
          },
        ],
      }
    ],
    ['container', {
      type: 'tip',
      defaultTitle: {
        '/': 'TIP',
      }
    }],
    ['container', {
      type: 'info',
      defaultTitle: {
        '/': 'INFO',
      }
    }],
    ['container', {
      type: 'success',
      defaultTitle: {
        '/': '',
      }
    }],
    ['container', {
      type: 'warning',
      defaultTitle: {
        '/': 'WARNING',
      }
    }],
    ['container', {
      type: 'danger',
      defaultTitle: {
        '/': 'WARNING',
      }
    }],
    ['container', {
      type: 'details',
      before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
      after: () => '</details>\n'
    }],
  ]
}
