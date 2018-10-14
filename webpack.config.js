const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/App.jsx',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: { loader: 'babel-loader' }
            }   
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'static'),
        compress: true,
        port: 8000,
        proxy: {
            '/api': "http://localhost:3000"
        },
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}