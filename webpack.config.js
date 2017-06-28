/**
 * Created by fanpf on 2017/5/26.
 */
const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context : resolve(__dirname,'src'),

  entry : [

    //开启React代码的模块热替换(HMR)
    'react-hot-loader/patch',

    //为webpack-dev-server环境打包代码
    //然后连接到制定服务器域名与端口
    //'webpack-dev-server/client?http://localhost:8000',

    //为热替换(HMR)打包好代码
    //only-意味着只有成功更新运行代码才会热替换(HMR)
    'webpack/hot/only-dev-server',

    //我们的app入口文件
    './index.js'
  ],

  output : {
    //输出的打包文件
    filename : 'bundle.js',

    path : resolve(__dirname,'dist'),

    //对热替换(HMR)是必须的，让webpack知道哪里热更新的模块(chunk)
    publicPath : '/'
  },

  devtool : 'inline-source-map',

  devServer : {
    //开启服务器的模块热替换(HMR)
    hot : true,

    //输出文件的目录
    contentBase : resolve(__dirname,'dist'),

    //和上问output的'publicPath'保持一致
    publicPath : '/'
  },

  module : {
    rules : [
      {
        test : /\.jsx?$/,
        use : ['babel-loader',],
        exclude : /node_modules/
      },
      {
        test : /\.css$/,
        use : ['style-loader','css-loader?modules',],
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: 'file-loader?name=./lib/font/[name].[ext]',
      }
    ],
  },

  plugins : [
    //开启全局的模块热替换
    new webpack.HotModuleReplacementPlugin(),

    //当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin(),

    new ExtractTextPlugin('styles.css')
  ],
};