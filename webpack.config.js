
const path = require('path');

module.exports = {
    entry: './src/index.jsx', // React entry point
    output: {
        path: path.resolve(__dirname, 'src/dist'), // Place bundled React app in src/dist
        filename: 'main[contenthash].js',
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
    mode: process.env.NODE_ENV==='development'? 'development' : 'production', // Set to 'development' or 'production'
};
