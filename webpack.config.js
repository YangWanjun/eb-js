const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  entry: [
    './src/app.js',
    './src/Signature.js',
    './src/Material.js',
    './src/Autocomplete.js',
    './src/olMap.js',
  ],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
    alias: {
      'config': path.resolve(__dirname, './src/config'),
      'utils': path.resolve(__dirname, './src/Utils'),
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist', '/workspace/areaparking/static/js']),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      config: 'config',
      utils: 'utils',
    }),
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    // console.log（）などのconsole.*系の記述を取り除いて出力する
    //    drop_console: true
    //  },
    //}),
  ],
  output: {
    filename: './bundle.js',
    //path: path.resolve(__dirname, 'dist')
    path: '/workspace/areaparking/static/js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      }
    ]
  },
};
