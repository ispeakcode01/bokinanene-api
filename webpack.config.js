const path = require('path')
const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: ["@babel/polyfill", './src/index.ts'],
    target: 'node',
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public'),
    },
    externals: [nodeExternals()]
}