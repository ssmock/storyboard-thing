require("object-assign");

var gulp = require("gulp");
var gUtil = require("gulp-util");
var path = require("path");
var webpack = require("webpack");
var del = require("del");
var webpackDevServer = require("webpack-dev-server");

var webpackConfig = require("./webpack.config.js");

gulp.task("build", function () {
    webpack(getWebpackConfig(), webpackCallback);

    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task("build-watch", function () {
    var config = getWebpackConfig();

    webpack(config, function () {
        console.log("...Completed initial build.");
        console.log("Watching for changes...");

        config.watch = true;

        webpack(config, webpackCallback);
    });

    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task("clean", function () {
    del("dist/*");

    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task("dev-server", function (callback) {
    var config = getWebpackConfig({
        devtool: "eval",
        debug: true
    });

    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));

    new webpackDevServer(webpack(config), {
        publicPath: "/" + config.output.publicPath,
        contentBase: "dist/",
        stats: {
            colors: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gUtil.PluginError("webpack-dev-server", err);

        gUtil.log("dev-server", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

function webpackCallback(err, stats) {
    if (err) {
        console.log("Webpack error!");

        throw new gUtil.PluginError("webpack", err);
    }
    else {
        console.log("Built @ " + new Date().toISOString());
    }
}

function getWebpackConfig(moreProps) {
    config = Object.assign({}, webpackConfig, moreProps);

    return config;
}