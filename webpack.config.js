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
        library: 'UIStream',
        libraryTarget: 'umd',
    },
    externals: {
        'rxjs': {
            commonjs: 'rxjs',
            commonjs2: 'rxjs',
            amd: 'rxjs',
            root: 'rxjs'
        },
        'rxjs/operators': {
            commonjs: 'rxjs/operators',
            commonjs2: 'rxjs/operators',
            amd: 'rxjs/operators',
            root: ['rxjs', 'operators']
        },
    }
};
