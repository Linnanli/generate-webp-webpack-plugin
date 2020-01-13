import webpackConfig from './webpack.config'
import GenerateWebpackPlugin from '../../src/index'
import webpack from 'webpack'
import fs from 'fs-extra'
import config from './config'

function deleteTestBuildedDir() {
    return fs.remove(config.output)
}

export default function generateWebpackSource(pluginOptions) {
    const plugin = new GenerateWebpackPlugin(pluginOptions)
    webpackConfig.plugins = [
        plugin
    ]

    return {
        plugin,
        deleteTestBuildedDir,
        compiler: new Promise((resolve, reject) => {
            webpack(webpackConfig, (err, status) => {
                if (err) return reject(err)
                resolve(status)
            })
        })
    }
}