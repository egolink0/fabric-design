const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const path = require("path");

module.exports = merge(baseConfig, {
  entry: "./src/main.ts",
  mode: "production",
  output: {
    // 配置打包完成的出口文件 路径
    path: path.resolve(__dirname, "../dist/"),
    libraryTarget: "umd",
    filename: "bundle.js", // 输出文件名
    clean: true, // 打包之前清理dist文件夹
  },
});
