if (process.env.NODE_ENV === 'test') {
  module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ]
    ],
    plugins: [
      [
        'component',
        {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        },
        'elememnt-ui'
      ]
    ]
  }
} else {
  module.exports = {
    presets: [['@vue/app']],
    plugins: [
      [
        'component',
        {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        },
        'elememnt-ui'
      ]
    ]
  }
}
