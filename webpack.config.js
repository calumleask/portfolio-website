var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "dist");
var APP_DIR = path.resolve(__dirname, "src");

var config = {
  entry: {
    app: APP_DIR + "/index.jsx"
  },

  output: {
    path: BUILD_DIR,
    filename: "[name].js"
  },

  module : {
    rules : [
      {
        test : /\.jsx?$/,
        include : APP_DIR,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.png$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "dist/images",
          outputPath: "images"
        }
      }
    ]
  }
};

module.exports = config;