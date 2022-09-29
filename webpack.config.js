const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: isDevelopment ? '/' : '/tech-map-d3',
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        //open: true,
        port: 3000
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jsx|js|tsx|ts)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react',
                            "@babel/preset-typescript"
                        ],
                        plugins: isDevelopment ? [require.resolve('react-refresh/babel')] : undefined,
                    }
                }]
            }
        ]
    },
    plugins: [
        ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
    ],
}