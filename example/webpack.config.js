const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  devServer: {
    stats: "minimal",
    contentBase: __dirname
  },
  module: {
    rules: [
      // { loader: require.resolve('./debugger') },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      // this rule applies to <template-native> blocks when TARGET is 'native'
      {
        loader: 'vue-custom-template-loader',
        resourceQuery: (query) => {
          let regex = /blockType=template-native/
          return query.match(regex) && process.env.TARGET === 'native'
        }
      }
    ]
  },
  resolveLoader: {
    alias: {
      'vue-custom-template-loader': require.resolve('../index')
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
