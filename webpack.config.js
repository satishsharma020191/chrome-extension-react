const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        option: path.resolve('src/options/options.tsx')
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
              },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist'),
                }
            ]
        }),
        new HtmlPlugin({
            title: 'React Extension',
            filename: 'popup.html',
            chunks: ['popup']    // this name shoud be same as entry name
        }),
        new HtmlPlugin({
            title: 'React Extension',
            filename: 'option.html',
            chunks: ['option']    // this name shoud be same as entry name
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js', //the name in this takes the entry key as name
        path: path.resolve('dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
            title: 'React Extension',
            filename: `${chunk}`.html,
            chunks: [chunk] 
        })
    )
}