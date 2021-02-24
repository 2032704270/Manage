const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("views", resolve("src/views"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
  },
  // 解决跨域
  devServer: {
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 http://119.29.68.100/public/
        target: 'http://119.29.68.100/public/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}