import config from './config'
import path from 'path'

// export default {
module.exports = {
    entry: {
        main: [path.resolve(__dirname, '../assets/index.js')]
    },
    output: {
        filename: 'js/[name].[hash:7].js',
        path: config.output
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }
            }
        ]
    }
}