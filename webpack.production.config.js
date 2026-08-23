const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
});

module.exports = {
  mode: 'production',
  entry: {
    app: [
      'core-js/stable',
      path.resolve(__dirname, 'src/main.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    filename: 'js/bundle.js',
    // webpack 5 replacement for clean-webpack-plugin
    clean: true,
  },
  optimization: {
    // `mode: production` already minifies with terser, which replaces the old
    // webpack.optimize.UglifyJsPlugin block.
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          filename: 'js/vendor.bundle.js',
        },
      },
    },
  },
  plugins: [
    definePlugin,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      // See webpack.config.js: v2-style blocking <body> injection is kept
      // because src/main.js reads layout metrics at script-execution time.
      inject: 'body',
      scriptLoading: 'blocking',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
      hash: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
        { from: 'src/manifest.json', to: './manifest.json' },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
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
    fallback: {
      fs: false,
      net: false,
      tls: false,
    },
  },
};
