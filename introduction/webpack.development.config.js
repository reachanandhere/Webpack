const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: '',
  },
  mode: "development",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist")
    },
    devMiddleware: {
      index: 'index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, //3kb
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', "css-loader", "sass-loader"],
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns:[
            "**/*",
            path.join(process.cwd(), 'build/**/*')
        ]
    }),
    new HtmlWebpackPlugin({
        title: 'Hello World',
        filename: 'index.html',
        template: 'src/index.hbs',
        description: 'Some Description' 
    })
  ],
};
