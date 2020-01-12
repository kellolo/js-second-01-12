const path = require ('path')
const nodeExt = require ('webpack-node-externals')
const copPlug = require ('copy-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve (__dirname, 'src', 'server', 'server.js')
    },
    output: {
        path: path.join (__dirname, 'dist', 'server'),
        publicPath: '',
        filename: 'bundle.js'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExt ()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
            
        ]
    },
    plugins: [
        new copPlug ([
            {
               from: 'src/server/db',
               to: 'db/[name].[ext]',
               toType: 'template' 
            }
        ])
    ]
}