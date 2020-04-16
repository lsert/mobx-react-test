const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devServer: {
    index: '/index.html',
    publicPath: '/',
    proxy: {
      '/api/pc': {
        target: 'http://5400-za-pi-bops.test.za.biz',
        pathRewrite: { '^/api/pc': '' },
        logLevel: 'debug',
        changeOrigin: true,
      }
    }
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-typescript', {
                  isTSX: true,
                  allExtensions: true,
                  allowNamespaces: true,
                }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              ["transform-class-properties", { "spec": true }]
            ]
          }
        },
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"     // creates style nodes from JS strings
        }, {
          loader: "css-loader"       // translates CSS into CommonJS
        }, {
          loader: "less-loader"      // compiles Less to CSS
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      components: path.resolve(__dirname, 'components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
    }),
  ],
}