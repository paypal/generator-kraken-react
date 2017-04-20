const path = require('path');
const webpack = require('webpack');

const prod = process.argv.indexOf('-p') !== -1;

const config = {
  entry: ['./public/main.js'],
  output: {
    path: path.resolve('./build/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-3']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};


config.plugins = config.plugins||[];
if (prod) {
  config.plugins.push(new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify("production")
        }
      }
  }));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
  }));
} else {
  config.plugins.push(new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify("")
        }
      }
  }));
}

module.exports = config;