const path = require('path');

const srcDir = path.resolve(__dirname, 'src');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const watch = require('watch');
const yargs = require('yargs');

const isWatching = yargs.argv.watch;

const LiveReload = new LiveReloadPlugin();

if (isWatching) {
  watch.watchTree('./app/', (f) => {
    LiveReload.server.notifyClients([f]);
  });
}

module.exports = {
  entry: {
    index: path.resolve(srcDir, 'index')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'pages')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'pages')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { context: 'app/', from: { glob: '**/*', dot: true } }
    ]),
    new ExtractTextPlugin('[name].css'),
    LiveReload
  ]
};
