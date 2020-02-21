const type = require('./utils/type')
const imageminWebp = require('imagemin-webp-copy')
const cloneDeep = require('lodash.clonedeep')
const path = require('path')

const defaultOpts = {
    test: /\.(png|jpe?g)$/,
    format: '[name].webp',
    webpOptions: {
        quality: 75
    }
}

module.exports = class GenerateWebpWebpackPlugin {
    constructor(opts = {}) {
        this.opts = this._mergeConfig(defaultOpts, opts)
        if (!type.isRegExp(this.opts.test) && !type.isFunction(this.opts.test)) {
            throw new TypeError('test parameter must be a regExp or Function')
        }
    }

    async apply(compiler) {
        if (compiler.hooks) {
            compiler.hooks.emit.tapAsync({ name: this.constructor.name }, (compilation, next) => {
                this._processAssets(compilation, next)
            })
        } else {
            compiler.plugin('emit', (compilation, next) => {
                this._processAssets(compilation, next)
            })
        }
    }

    async _processAssets(compilation, next) {
        for (const assetPath in compilation.assets) {
            if (!this._isMatch(assetPath)) continue
            const targetPath = this._formatPath(assetPath)
            if (compilation.assets[targetPath]) continue
            const source = await this._createWebpSource(compilation.assets[assetPath])
            compilation.assets[targetPath] = source
        }
        next()
    }

    async _createWebpSource(raw) {
        const instance = imageminWebp(this.opts.webpOptions)
        const buffer = await instance(raw.source())
        let cloneRaw = cloneDeep(raw)
        cloneRaw._value = buffer
        cloneRaw.source = () => buffer
        cloneRaw.size = () => buffer.length

        return cloneRaw
    }

    _formatPath(assetPath) {
        const meta = path.parse(assetPath)
        const newPath = this.opts.format.replace(/\[(\w+)\]/g, ($0, $1) => {
            if ($1 === 'ext') return meta[$1].substr(1)
            return meta[$1] || ''
        })
        const { ext, name, base } = path.parse(newPath)
        return path.format(Object.assign(meta, { ext, name, base }))
    }

    _isMatch(assetPath) {
        let state = true
        if (type.isRegExp(this.opts.test) && !this.opts.test.test(assetPath)) {
            state = false
            return state
        }
        if (type.isFunction(this.opts.test) && !this.opts.test(assetPath)) {
            state = false
            return state
        }

        return state
    }

    _mergeConfig(defaultOpts, opts = {}) {
        let webpOptions = Object.assign({}, defaultOpts.webpOptions, opts.webpOptions)
        let options =  Object.assign({}, defaultOpts, opts)
        options.webpOptions = webpOptions

        return options
    }
}