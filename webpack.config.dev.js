var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var eslintFriendlyFormatter = require('eslint-friendly-formatter')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

var dirname = path.resolve(__dirname)
var devPort = 3004
var extractStyle = function (styleLoaders) {
  if (!styleLoaders) styleLoaders = []
  return ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader'
      }
    ].concat(styleLoaders)
  })
}

module.exports = {
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:' + devPort, // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading,only- means to only hot reload for successful updates
    './src/index.js'
  ],
  output: {
    filename: 'js/bundle.[hash].js',
    path: dirname + '/dist',
    publicPath: '/' // necessary for HMR to know where to load the hot update chunks
  },
  devtool: 'inline-source-map',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'babel-polyfill': 'window',
    'redux': 'Redux',
    'react-redux': 'ReactRedux',
    'redux-thunk': 'ReduxThunk'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractStyle()
      },
      {
        test: /\.sass$/,
        use: extractStyle([
          {
            loader: 'sass-loader'
          }
        ])
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFriendlyFormatter
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: './assets/imgs/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: './assets/fonts/[name].[hash:7].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'action': dirname + '/src/action',
      'component': dirname + '/src/component',
      'common': dirname + '/src/common',
      'config': dirname + '/src/config',
      'reducer': dirname + '/src/reducer',
      'util': dirname + '/src/util',
      'service': dirname + '/src/service'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new webpack.NoEmitOnErrorsPlugin(),  // do not emit compiled assets that include errors
    new webpack.ProgressPlugin(function (percent, msg) {
      percent = Math.floor(percent * 1000) / 10
      percent += '%'
      while (percent.length < 10) {
        percent += ' '
      }
      process.stdout.write(percent + msg + '\r')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: dirname + '/src/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.[contenthash].css'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:' + devPort
    })
  ],
  devServer: {
    host: 'localhost',
    port: devPort,
    inline: true,
    historyApiFallback: true, // respond to 404s with index.html
    hot: true, // enable HMR on the server
    proxy: {

    }
  }
}
