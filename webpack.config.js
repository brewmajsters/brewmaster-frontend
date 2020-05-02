const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:80',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/src/index.tsx')
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
