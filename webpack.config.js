const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = () => {

  const env = dotenv.config().parsed,
    envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});


  return {
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.(jpe?g|gif|ico|png|svg|jpg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        favicon: './src/assets/Inventicon.ico'
      }),
      new webpack.ExternalsPlugin('commonjs', [
        'electron'
      ]),
      new webpack.DefinePlugin(envKeys)
    ],
    resolve: {
      extensions: [".js", ".jsx"],
      mainFields: ['module', 'jsnext:main', 'browser', 'main']
    },
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          uglifyOptions: {
            compress: {
              // Drop only console.logs but leave others
              pure_funcs: ['console.log'],
            },
            mangle: {
              // Note: I'm not certain this is needed.
              reserved: ['console.log']
            }
          }
        })
      ]
    }
  }
};
