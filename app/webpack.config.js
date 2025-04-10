'use strict';

import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import HtmlPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlTagsPlugin from 'html-webpack-tags-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default () => ({
    externals: {
        cesium: 'Cesium',
    },
    mode: isDevelopment ? 'development' : 'production',
    stats: {
        warnings: false,
    },
    devServer: {
        hot: true,
        open: true,
        static: path.join(__dirname, 'public'), // ここでstaticを指定
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { modules: false }],
                            ['@babel/preset-react', { runtime: 'automatic' }],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                quietDeps: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
                use: ['url-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            CESIUM_BASE_URL: JSON.stringify('/cesium'),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'node_modules/cesium/Build/Cesium',
                    to: 'cesium',
                },
                {
                    from: 'public/setting.json',
                    to: 'setting.json',
                },
                {
                    from: 'public/data',
                    to: 'data',
                    noErrorOnMissing: true,
                },
            ],
        }),
        new HtmlPlugin({
            template: 'public/index.html',
        }),
        new HtmlTagsPlugin({
            append: false,
            tags: ['cesium/Widgets/widgets.css', 'cesium/Cesium.js'],
        }),
        new Dotenv(),
        ...(isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : []),
        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            exclude: ['node_modules'],
            overrideConfigFile: path.resolve('./eslint.config.js'),
            fix: true,
        }),
    ],
});
