const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const path = require("path");

module.exports = merge(baseConfig, {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    // 配置打包完成的出口文件 路径
    path: path.resolve(__dirname, "../dist/"),
    filename: "bundle.js", // 输出文件名
    clean: true, // 打包之前清理dist文件夹
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    port: 4000,
    open: true,
  },
});
