var webpack = require("webpack");
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var Dotenv = require("dotenv-webpack");
var DashboardPlugin = require('webpack-dashboard/plugin');
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var LiveReloadPlugin = require('webpack-livereload-plugin');
var dotenv = require('dotenv').config({path: __dirname + '/.env'});
var hostname = 'hammes.loc';

new webpack.DefinePlugin({
  "process.env": dotenv.parsed
})

module.exports = function(env, argv) {
  return{
    // Define the entry points of our application (can be multiple for different sections of a website)
    entry: {
      main: [
        "core-js/modules/es.promise",
        "core-js/modules/es.array.iterator",
        "./src/index.js"
      ],
      style: "./src/style.js"
    },
    output: {
      path: path.resolve(__dirname, 'web'),
      filename: '[name].js'
    },
    // Define development options
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            argv.mode === 'development' ? 'production' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: argv.mode === 'development'
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules)/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: argv.mode === 'development',
                url: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("autoprefixer")]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: argv.mode === "production" ? "compressed" : "expanded"
                }
              }
            }
          ]
        },
        // Use babel for JS files
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.(woff)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "web/fonts/[name].[ext]",
            },
          },
        },

      ]
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new Dotenv({
        path: "./.env"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new DashboardPlugin(),
      new LiveReloadPlugin({
        appendScriptTag: false,
        protocol: "https",
        hostname: hostname
      })
    ],
    target: "node",
    resolve: {
      alias: {
      }
    }
  };
};
