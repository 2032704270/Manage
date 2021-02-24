// 导入path模块，path是nodejs自带的模块，作用是用来处理路径相关的事情
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const config = {
  // 配置入口文件，告诉webpack从哪里开始打包
  entry: './src/main.js',
  // 配置出口 output是输出的意思
  output: {
    // 配置输出的路径
    // __dirname是当前目录的意思，打包好的文件放在当前的dist文件夹内，dist文件会自动生成
    path: path.resolve(__dirname, 'dist'),
    // 打包后的js文件名称
    filename: 'bundle.js',
    publicPath: '/manage/'
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // 开发阶段不建议压缩代码
    new UglifyjsWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader只负责将css文件进行加载
        // style-loader负责将css样式添加到dom中
        // 使用多个loader时从右向左开始读取，如果顺序不对直接报错
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当加载的图片小于limit时，会将图片编译成base64字符串形式
              // 当加载的图片大于limit时，需要使用file-loader模块进行加载
              limit: 0,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  // resolve: 解决
  resolve: {
    // extensions: 扩展
    extensions: ['.js', '.css', '.vue'],
    // alias: 别名
    alias: {
      // esm: es_module
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}

module.exports = config