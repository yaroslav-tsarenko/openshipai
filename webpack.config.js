const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development', // or 'production'
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Clean the output directory before build
    },
    cache: {
        type: 'filesystem', // Enable persistent caching on the filesystem
        cacheDirectory: path.resolve(__dirname, '.webpack_cache'), // Specify cache directory
        buildDependencies: {
            config: [__filename], // Invalidate cache when the configuration file changes
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader', // Enable multi-threading
                        options: {
                            workers: Math.max(1, require('os').cpus().length - 1), // Use available CPU cores
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                            cacheDirectory: true, // Enable caching for Babel
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets/',
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true, // Enable multi-threading for Terser
                terserOptions: {
                    compress: {
                        drop_console: true, // Remove console.logs in production mode
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: 'all', // Split vendor code and app code
        },
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.ProgressPlugin(), // Show build progress
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
