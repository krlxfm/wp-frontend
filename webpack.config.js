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
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
            }
        ]
    }
}

var client = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index.ts',
    ],
    output: {
        path: path.join(process.cwd(), '/build'),
        filename: 'client.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({quiet: true}),
        new HtmlWebpackPlugin()
    ],
};

module.exports = Object.assign(client, base);