const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  // 打包环境，测试环境还是生产环境，不添加会报警告
  mode: 'development',
  // 相对路径
  entry: {
    app: './src/index.js'
  },
  // 输出配置
  output: {
    // 输出在项目根目录的dist文件夹，会自动创建
    path: path.resolve(__dirname, './dist'),
    // js的文件名称
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模板路径，注意需要和index.html路径对应
      template: path.resolve(__dirname, './public/index.html'),
      // 文件名称
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new friendlyErrorsWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  }

}
