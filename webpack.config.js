const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer(), cssnano()],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: { quietDeps: true },
                        }
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".scss", ".css"],
        alias: {
            "~": path.resolve(process.cwd(), "src"),
        },
    },
    entry: {
        styles: "./src/styles/main.scss",
    },
    output: {
        path: path.resolve(__dirname, "dist/css"),
        publicPath: "/dist/css",
    },
    plugins: [
        // Define the filename pattern for CSS.
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    stats: {
        loggingDebug: ["sass-loader"],
    },
};
