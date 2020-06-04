const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 表示这几个文件的后缀名可以省略不写
        alias: {
          '@': path.resolve(__dirname, '../src')// 这样@就表示项目根目录中src的这一层路径（绝对路径）
        }
    },
    plugins: [
        new CleanWebpackPlugin()
      ],
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      cacheDirectory: true // 优化打包速度
                    }
                  }
                ]
            }
        ]
    }
}