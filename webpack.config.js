var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    // 项目入口. 可以直接用文件夹名称, 默认会找 index.js; 也可以确定是哪个文件名字
    entry: {
        app: './src/app.js'
    },
    // 项目出口. 让 webpack 把处理完成的文件放在哪里
    output: {
        path: DIST_PATH,
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    // 模块. 要用什么不同的模块来处理各种类型的文件
    module: {
        preLoaders: [{
            test: /\.js$/,
            include: SRC_PATH,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.js$/,
            include: [
                path.resolve(ROOT_PATH, 'src'),
                path.resolve(ROOT_PATH, 'node_modules/react-hui')
            ],
            loader: 'babel',
            query: {
                plugins: [['import', {libraryName: 'antd', style: 'css'}]],
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
        }, {
            test: /\.less$/,
            include: [
                path.resolve(ROOT_PATH, 'src'),
                path.resolve(ROOT_PATH, 'node_modules/react-hui')
            ],
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!less-loader?sourceMap')
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=40000'
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
            }]
    },
    eslint: {
        configFile: './.eslintrc.json'
    },
    postcss: [autoprefixer],
    // 启用 source-map
    devtool: 'source-map',
    // 配置 webpack-dev-server 代理
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8081',
                secure: false
            }
        }
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        // 添加我们的插件会自动生成一个 html 文件
        new HtmlwebpackPlugin({
            template: 'index.html',
            chunks: ['app'],
            title: 'Hello World app'
        })
    ]
};
