module.exports = {
  // 测试环境 开启SourceMap 生产关闭 SourceMap
  productionSourceMap: process.env.NODE_EVENT == "prod" ? false : true,
  css: {
    loaderOptions: {
      postcss: {
        // @/ 是 src/ 的别名
        //   node_modules 不进行编译
        // exclude: /(node_modules)/
      }
    }
  },
  configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "element-ui": "ELEMENT"
    };
  },
  devServer: {
    // proxy: "http://127.0.0.1:7001"
    proxy:"http://minecraft.cssandjs.com"
  },
  chainWebpack: config => {
    config.module
      .rule("text")
      .test(/\.md$/)
      .use("text-loader")
      .loader("text-loader")
      .end();
  },
  baseUrl:
    process.env.NODE_EVENT == "prod" ? "/" : "/"
};
