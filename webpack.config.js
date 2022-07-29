const path  = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 自定义模块
module.exports = {
    mode: "production",
    devServer: {
        contentBase: "./build",
        port: 9001,
        open: true
    },
    entry:{
        main:'./src/index.js',
       
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            esModule: false,
                            limit: 20
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // html
        new HtmlWebpackPlugin({
            template: `./src/index.html`
        })
    ]
};
