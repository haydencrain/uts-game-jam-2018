const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
});

module.exports = {
  mode: 'development',
  // src/main.js already imports pixi/p2/phaser, so a separate `vendor` entry is
  // redundant under webpack 5 -- optimization.splitChunks below carves the
  // node_modules code out into vendor.bundle.js instead.
  entry: {
    app: [
      'core-js/stable',
      path.resolve(__dirname, 'src/main.js'),
    ],
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js',
  },
  optimization: {
    // webpack 5 replacement for webpack.optimize.CommonsChunkPlugin
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          filename: 'vendor.bundle.js',
        },
      },
    },
  },
  plugins: [
    definePlugin,
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
      // html-webpack-plugin 5 defaults to deferred scripts in <head>; v2 (used
      // before this upgrade) emitted blocking scripts at the end of <body>.
      // src/main.js sizes the Phaser canvas from documentElement.clientWidth /
      // clientHeight at script-execution time, so keep the v2 behaviour rather
      // than change when that measurement happens. Chunk order (vendor before
      // app) is resolved automatically from the splitChunks dependency graph.
      inject: 'body',
      scriptLoading: 'blocking',
      minify: false,
      hash: false,
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './build'],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src'),
      },
      {
        test: /pixi\.js/, loader: 'expose-loader', options: { exposes: 'PIXI' },
      },
      {
        test: /phaser-split\.js$/, loader: 'expose-loader', options: { exposes: 'Phaser' },
      },
      {
        test: /p2\.js/, loader: 'expose-loader', options: { exposes: 'p2' },
      },
    ],
  },
  resolve: {
    alias: {
      phaser,
      pixi,
      p2,
    },
    // webpack 5 replacement for `node: { fs: 'empty', net: 'empty', tls: 'empty' }`
    fallback: {
      fs: false,
      net: false,
      tls: false,
    },
  },
};
