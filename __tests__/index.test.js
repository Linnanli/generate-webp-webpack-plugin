import path from 'path'
import fileType from 'file-type'
import type from '../src/utils/type'
import generateWebpackSource from './build/index'
import config from './build/config'
import fs from 'fs-extra'

describe('test plugin', () => {
    let webpackSource
    beforeAll(() => {
        webpackSource = generateWebpackSource({
            format: '[name].[ext].webp',
            webpOptions: {
                method: 0,
                quality: 80
            }
        })
        return webpackSource.deleteTestBuildedDir()
    })

    afterAll(() => {
        return webpackSource.deleteTestBuildedDir()
    })

    test('merge config', () => {
        expect(webpackSource.plugin.opts).toEqual({
            test: /\.(png|jpe?g)$/,
            format: '[name].[ext].webp',
            webpOptions: {
                method: 0,
                quality: 80
            }
        })
    })

    test('generate webp', () => {
        const regexp = webpackSource.plugin.opts.test

        return webpackSource.compiler.then(async (stats) => {
            const assets = stats.compilation.assets
            const matchedAssets = Object.keys(assets).filter(assetPath => regexp.test(assetPath))

            expect(matchedAssets.length).toBeGreaterThan(0)

            for (let i = 0; i < matchedAssets.length; i++) {
                const assetPath = matchedAssets[i]
                const webpPath = `${assetPath.split('/').join(path.sep)}.webp`
                // 测试 webp buffer 是否生成
                expect(type.isPlainObject(assets[webpPath])).toBeTruthy()
                expect(type.isFunction(assets[webpPath].source)).toBeTruthy()
                expect(assets[webpPath].source() instanceof Buffer).toBeTruthy()
                // 测试 生成的图片是否是.webp格式的图片
                const { ext, mime } = await fileType.fromBuffer(assets[webpPath].source())
                expect(ext).toBe('webp')
                expect(mime).toBe('image/webp')
                // 测试 webpack有没有将webp和png图片写入到目录
                await expect(fs.pathExists(path.resolve(config.output, assetPath))).resolves.toBeTruthy()
                await expect(fs.pathExists(path.resolve(config.output, webpPath))).resolves.toBeTruthy()
            }
        }).catch((e) => {
            throw e
        })
    })
})