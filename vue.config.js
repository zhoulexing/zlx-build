const path = require("path");

function resolve (dir) {
    return path.join(__dirname, "./", dir)
}

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
                "layouts": resolve("./src/layouts"),
                "components": resolve("./src/components"),
                "views": resolve("./src/views"),
                "modules": resolve("./src/modules"),
            }
        }
    },
    // chainWebpack: config => {
    //     // svg rule loader
    //     const svgRule = config.module.rule("svg");
    //     svgRule.uses.clear();
    //     svgRule.exclude.add(/node_modules/); // 排除node_modules目录
    //     svgRule
    //         .test(/\.svg$/)
    //         .use("svg-sprite-loader")
    //         .loader("svg-sprite-loader")
    //         .options({
    //             symbolId: "icon-[name]"
    //         });
    //     // image rule loader
    //     const imagesRule = config.module.rule("images");
    //     imagesRule.exclude.add(resolve("src/icons"));
    //     config.module
    //         .rule("images")
    //         .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    // },
    // css: {
    //     modules: true,
    //     sourceMap: false,
    //     loaderOptions: {
    //         css: {
    //             localIdentName: "[name]-[hash]",
    //             camelCase: "only"
    //         }
    //     }
    // }
};