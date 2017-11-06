// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    publicPath: './',
    filename: "css/[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development",
    allChunks: true
});


module.exports = {
    entry:{
      app:'./app/main.js',//唯一入口
      common: ['jquery'],//公共js文件
    },
    devtool: '#source-map',
    output: {
        path: __dirname + "/build/page1",
        publicPath:'http://localhost:8080/',
        filename: "js/bundle-[hash].js"//打包文件
    },
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true
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
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              }
            ]
        },
        {
          test: /\.less$/,
          use: extractLess.extract({
              use: [{
                  loader: "css-loader"
              }, {
                  loader: "less-loader"
              },
              {
                  loader: "postcss-loader"
              }
            ],
              // use style-loader in development
              fallback: "style-loader"
          })
        },
        {
　　　　　　test: /\.html$/,
　　　　　　loader: 'html-withimg-loader',
          query: {
              publicPath: './page1/'
          }
　　　　  },
        // {
        //   test: /\.(png|jpg|gif|svg)$/,
        //   loader: 'url-loader',
        //   query: {
        //       limit: 10,
        //       publicPath: './',
        //       name: 'images/[hash:8].[name].[ext]'
        //   }
        // },
        {
          test: /\.(png|jpe?g|gif|ico)(\?\S*)?$/,
          loader: 'file-loader',
          query: {
              limit: 1000,
              name: 'images/[hash:8].[name].[ext]'
          }
        },
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.html" ,//new 一个这个插件的实例，并传入相关的参数
            minify: {
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
        }),
        new webpack.HotModuleReplacementPlugin(),  //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.ProvidePlugin({//引入jq
          $: "jquery",
          jQuery: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({    //打包公共文件
           name: 'common',
           filename: 'js/common.bundle.js'
        }),
        new webpack.optimize.UglifyJsPlugin({  //打包js文件 进行压缩
          drop_console: true,
          minimize: true,
          output: {
            comments: false
          }
        }),
        extractLess,//less
        new webpack.BannerPlugin('CopyRight by JYZ'),//打包banner
    ],
};
