const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const formattedEnv = { env: {} }
Object.keys(process.env).forEach(env => {
    formattedEnv.env[env] = JSON.stringify(process.env[env])
})

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../server/public'),
        clean: true,
    },
    resolve: {
        root: path.resolve('.'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todos to do',
            template: path.resolve(__dirname, 'public', 'index.html.template'),
            favicon: './public/favicon.ico',
        }),
        new webpack.DefinePlugin({ process: formattedEnv }),
    ],
}
