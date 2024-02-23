const path = require('path');

const TerserPlugin = require("terser-webpack-plugin");
const BundleTracker= require('webpack-bundle-tracker');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Path definitions
const entrypoints = {
    main: {
        import: './_front/ts/main.ts',
    },
}

const production_path = {
    dest: path.resolve(__dirname, '_static/dist'),
    pub: '/static/dist/'
}

const development_path = {
    dest: path.resolve(__dirname, '_static/src'),
    pub: '/static/src/'
}

module.exports = env => {
    let dev_mode = env.development || false;
    let build_path = dev_mode ? development_path : production_path;

    return {
        mode: dev_mode ? 'development' : 'production',
        devtool: dev_mode ? 'inline-source-map' : 'nosources-source-map',

        entry: entrypoints,

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, "_front"),
                    use: ["style-loader", "css-loader", "postcss-loader"],
                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new BundleTracker({
                path: __dirname,
                filename: 'webpack-stats.json'
            }),
        ],

        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                extractComments: false,
            })],
        },

        output: {
            filename: dev_mode ? '[name].js' : '[name].min.js',
            path: build_path.dest,
            publicPath: build_path.pub
        }
    }
}
