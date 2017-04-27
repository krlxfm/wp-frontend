const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

var base = {
    resolve: {
        extensions: ['.ts', '.tsx', '.web.js', '.js', '.jsx', '.webpack.js', '.scss']
    },

    module: {
        rules: [
            { 
                enforce: 'pre',
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            }
        ]
    }
}

var client = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index.tsx',
    ],
    output: {
        path: path.join(process.cwd(), '/build'),
        publicPath: '/',
        filename: 'client.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({quiet: true}),
        new HtmlWebpackPlugin({template: 'src/index.html'})
    ],
    devServer: {
        hot: true,
        quiet: false,
        clientLogLevel: 'info',
        historyApiFallback: {
            index: 'index.html'
        },
        proxy: {
            "/wp-json": {
                target: "http://krlx.org",
                changeOrigin: true
            },
            "/data.php": {
                target: "http://live.krlx.org/data.php",
                changeOrigin: true
            }
        }
    }
};

module.exports = Object.assign(client, base);