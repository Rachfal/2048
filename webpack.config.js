const path = require("path");

module.exports = {
    entry: './js/app.js',
    output: {
        filename: "js/out.js",
        path: path.resolve(__dirname, ".")
    },
    watch: false,
    mode: 'development',
    devtool: "source-map",
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        // host: '192.168.1.110',
        compress: true,
        port: 3000,
        historyApiFallback: true
      },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            }
        ]
    }
}