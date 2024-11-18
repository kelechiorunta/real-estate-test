// const path = require('path');

// const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals');

// module.exports = {
//     entry: "./src/index.js",
//     output: {
//         filename: "main.js",
//         path: path.resolve("./src/dist"),
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'css-loader',
                    
//                 }
//             }
//         ]
//     },
//     resolve: {
//         extensions: ['.js'],
//         fallback: {
//             "stream": false,
//             "url": false,
//             "cors": false,
//             "fs": false,
//             "async_hooks": false,
//             "os": false//require.resolve("os-browserify/browser"),
//         }
//     },
//     externals: [
//         nodeExternals(), // Ignore all modules in node_modules
//         {
//             'async_hooks': 'commonjs async_hooks',
//             'os': 'commonjs os',
//         }
//     ],
// };

const path = require('path');

module.exports = {
    entry: './src/index.jsx', // React entry point
    output: {
        path: path.resolve(__dirname, 'src/dist'), // Place bundled React app in src/dist
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development', // Set to 'development' or 'production'
};
