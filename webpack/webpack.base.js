const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // 访问内置的插件

module.exports = {
  // entry: "./src/index.tsx", // 配置打包入口文件
  // mode: "development",
  // output: {
  //   // 配置打包完成的出口文件 路径
  //   path: path.resolve(__dirname, "./dist/"),
  //   filename: "bundle.js", // 输出文件名
  //   clean: true, // 打包之前清理dist文件夹
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpeg|jpg|bmp)$/,
        use: {
          loader: "file-loader", // 使用的什么loader 当然你也可以使用 url-loader ，url-loader是封装了file-loader。
          options: {
            outputPath: "images", // 输出到 dist 哪个 目录下,
            limit: 5 * 1024,
            name: "[name].[ext]", // 生成的文件名称 [name] : 原文件名称 [ext] : 原文件后缀 ， [hash] :生成哈希值字符串
          },
        },
      },
      {
        test: /\.(tsx|ts|js|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
              ["@babel/preset-typescript", { corejs: 3, useBuiltIns: "usage" }],
            ],
            plugins: [["@babel/plugin-transform-runtime"]], // // 该插件会在需要regeneratorRuntime的地方自动require导入,兼容async/await语法
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 生成HTML文件的模板文件
      filename: "index.html", // 生成的HTML文件名
      inject: "body", // <script>标签插入的地方
    }),
  ],
  // optimization: {
  //   minimizer: new CssMinimizerWebpackPlugin(),
  // },
  // devServer: {
  //   hot: true,
  // },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], //表示在import 文件时文件后缀名可以不写
    // 设置别名
    alias: {
      "@": path.resolve(__dirname, "../src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
  // devtool: "inline-source-map",
};
