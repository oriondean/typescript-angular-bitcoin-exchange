var path = require('path');
var scripts = path.resolve(__dirname, "app/scripts");

module.exports = {
    entry: [
        './app/scripts/index.ts'
    ],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loaders: ['tslint-loader'],
                include: scripts
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                include: scripts
            },
            {
                test: /\.html$/,
                loader: 'html',
                include: scripts
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: scripts
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: path.resolve(__dirname, "app/css")
            }
        ]
    }
};