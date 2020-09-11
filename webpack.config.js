const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    assets: './src/assets/assets.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  devServer: {
    overlay: true,
    port: 8081
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: './postcss.config.js'}
            },
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true}
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash].css'
    }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false ,}),
    new HtmlWebpackPlugin ({
      hash: false,
      filename: './index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin ({
      hash: false,
      filename: './pages/assets.html',
      template: './src/assets/assets.html',
    }),
  ],
}
