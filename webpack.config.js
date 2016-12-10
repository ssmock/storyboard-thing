const webpack = require("webpack");

module.exports = {
    context: __dirname + "/src",
    entry: {
        app: "./app.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist/assets",
        publicPath: "/assets",            // New
    },
    devServer: {
        contentBase: __dirname + "/src",  // New
    },
};