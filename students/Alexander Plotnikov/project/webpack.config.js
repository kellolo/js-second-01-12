const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/build/js/', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'buildProject/frontDir'),
        publicPath: '',
        filename: 'js/main.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test: /\.(woff(2)?|ttf|eot|png|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    // watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/build/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyPlugin([{
                from: path.resolve(__dirname, 'src/build/img/'),
                to: path.resolve(__dirname, 'buildProject/frontDir/img')
            }
        ])
    ]
}