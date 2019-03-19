var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ui-stream.js',
        library: 'UIStream'
    },
    externals: {
        rxjs: {
            commonjs: 'rxjs',
            commonjs2: 'rxjs',
            amd: 'rxjs',
            root: 'rxjs'
        }
    }
};
