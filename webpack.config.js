
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  devtool: 'source-map',//开发工具
  entry:{
    app:'./app/main.js',//唯一入口
    common: ['jquery'],//公共js文件
  },
  output:{
    path:__dirname +'/public',//打包后文件存放目录
    filename:'bundle.js'
  },
  devServer: {
    contentBase: "./app",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,
    hot: true//实时刷新
  },
  module:{
    rules:[
      {
        test:/(\.jsx|\.js)$/,//js
        use:{
          loader:"babel-loader"
        },
        exclude:/node_modules/
      },
      {
        test: /\.css$/,//css
        use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options:{
                module:true
              }
            },
            {
              loader: "postcss-loader"
            }
          ]
      },
      {
        test: /\.less$/,//less
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader", // compiles Less to CSS
            options:{
              strictMath: true,
              noIeCompat: true
            }
        }, {
            loader: "postcss-loader"
        }
      ]
      },
      {
        // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
        // 如下配置，将小于10000byte的图片转成base64码
        test:  [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: '[name].[hash:8].[ext]',
        }
      }
    ]
  },
  plugins: [

      new webpack.BannerPlugin('CopyRight by JYZ'),

      new HtmlWebpackPlugin({
            template: __dirname + "/app/index.html" //引入页面入口html
      }),
      new webpack.HotModuleReplacementPlugin(),//热更新
      new webpack.ProvidePlugin({//引入jq
        $: "jquery",
        jQuery: "jquery"
      }),
      new webpack.optimize.CommonsChunkPlugin({//公共文件
         name: 'common',
         filename: 'common.bundle.js'
      })
  ]
}
