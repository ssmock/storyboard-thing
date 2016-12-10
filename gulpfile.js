var gulp = require("gulp");
var gUtil = require("gulp-util");
var path = require("path");
var webpack = require("webpack");
var del = require("del");

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

gulp.task("build-prod", function () {
    del("dist/*").then(function () {
        var ticks = Number(new Date());

        var minifiedConfig = getWebpackConfig();

        var optimize = new webpack.optimize.UglifyJsPlugin({ minimize: true });

        minifiedConfig.plugins = [
            optimize,
            minifiedChunk
        ];

        minifiedConfig.plugins.push(optimize);
        minifiedConfig.output.filename = "app.bundle." + ticks + ".min.js";

        webpack(minifiedConfig, function (err, stats) {
            webpackCallback(err, stats);
        });

        var nonMinifiedConfig = getWebpackConfig();

        webpack(nonMinifiedConfig, function (err, stats) {
            webpackCallback(err, stats);
        });

        gulp.src('src/index.html')
            .pipe(gulp.dest('dist'));
    });
});

gulp.task("clean", function () {
    del("dist/*");

    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
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
    var config = {
        debug: true,
        devtool: 'source-map',
        entry: {
            main: './src/start.jsx'
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'app.bundle.js'
        },
        module: {
            loaders: [{
                test: /\.jsx$|\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }]
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    };

    config = Object.assign({}, config, moreProps);

    return config;
}