const webpack = require('webpack')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

let myPlugins = []
//这个打开后导致 moment找不到 locale.js
myPlugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
if (process.env.NODE_ENV === 'production') {
  myPlugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|vue|css|json|txt|html|ico|svg)(\?.*)?$/i,
      threshold: 1024,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    })
  )
}
const sourceMap = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: './', //输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项
  outputDir: 'dist', //构建输出目录
  assetsDir: 'assets', //静态资源目录(js,css,img,fonts)
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: sourceMap,
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  css: {
    // 是否使用css分离插件 ExtractTextPlugin dev环境下如果开启的话就不会热更新样式
    // extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  configureWebpack: {
    plugins: myPlugins,
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // 只打包初始时依赖的第三方
          },
          elementUI: {
            name: 'chunk-elementUI', // 单独将 elementUI 拆包
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          },
          vuescroll: {
            name: 'chunk-vuescroll', // 单独将 vuescroll 拆包
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            test: /[\\/]node_modules[\\/]vuescroll[\\/]/,
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // 可自定义拓展你的规则
            minChunks: 3, // 最小公用次数
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
  devServer: {
    open: true,
    port: 8080,
  },
}
