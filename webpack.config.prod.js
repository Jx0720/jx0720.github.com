var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var dirname = path.resolve(__dirname)
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
        include: [
          dirname + '/src'
        ],
        use: [
          'babel-loader'
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
            name: '/assets/fonts/[name].[hash:7].[ext]'
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
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.ProgressPlugin(function (percent, msg) {
      percent = Math.floor(percent * 1000) / 10
      percent += '%'
      while (percent.length < 10) {
        percent += ' '
      }
      process.stdout.write(percent + msg + '\r')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.[contenthash].css'
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: dirname + '/src/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'zopfli',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })   //  开启gzip压缩
  ]
}
