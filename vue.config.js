const path = require("path");

module.exports = {
    outputDir: "client",
    lintOnSave: false,
    devServer: {
        open: false,
        port: 8003
    },
    configureWebpack: {
        resolve: {
            alias: {
                "layouts": path.resolve(__dirname, "./src/layouts"),
                "components": path.resolve(__dirname, "./src/components"),
                "views": path.resolve(__dirname, "./src/views"),
            }
        }
    }
};