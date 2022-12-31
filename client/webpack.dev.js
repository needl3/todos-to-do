const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

const m = merge(common, {
    mode: 'development',
    infrastructureLogging: { level: 'error' },
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'),
        compress: true,
        port: 3000,
    },
})

console.log(m)

module.exports = m
