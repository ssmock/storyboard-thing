var webpack = require("webpack");
var path = require("path");

module.exports = {
    debug: true,
    devtool: 'source-map',
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: "dist/",
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }]
    },
    resolve: {
        extensions: ['', '.js']
    }
};