const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "周某人",
            template: `./src/index.ejs`,
            filename: `index.html`,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css"],
        modules: ["node_modules"],
        alias: require("./src/alias")
    },
    devtool: "inline-source-map",
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: "babel-loader"
        }, {
            test: /\.(less|css)$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: true,
                        localIdentName: "[local]_[hash:base64:5]"
                    }
                },
                "postcss-loader",
                {
                    loader: "less-loader",
                    options: {
                        modifyVars: require("./src/theme"),
                        javascriptEnabled: true,
                    }
                }
            ]
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        hot: true,
        host: "127.0.0.1",
        port: 8889,
    }
};
