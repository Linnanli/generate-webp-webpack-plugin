<h1 align="center" style="border-bottom: none;">generate-webp-webpack-plugin</h1>
<h3 align="center">这是一个生成webp图片文件的webpack插件</h3>
<p align="center">
  <a href="https://www.travis-ci.org/Linnanli/generate-webp-webpack-plugin">
    <img alt="Build status" src="https://www.travis-ci.org/Linnanli/generate-webp-webpack-plugin.svg?branch=master">
  </a>
  <a href='https://coveralls.io/github/Linnanli/generate-webp-webpack-plugin?branch=master'>
    <img alt='Coverage Status' src='https://coveralls.io/repos/github/Linnanli/generate-webp-webpack-plugin/badge.svg?branch=master'/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/Linnanli/generate-webp-webpack-plugin/blob/master/README.md">
     📘English Docs
  </a>
</p>

# 支持webpack版本

暂时只支持webpack3.0+, 后续会尽快支持webpack4.0+

# 安装

## npm

``` hash
$ npm install generate-webp-webpack-plugin --save-dev
```

## yarn

``` hash
$ yarn add generate-webp-webpack-plugin -D
```

# 用法

1. 在`webpack` `plugins`数组中实例化`generate-webp-webpack-plugin`插件

``` javascript
const GenerateWebpWebpackPlugin = require('generate-webp-webpack-plugin')

{
    plugins: [
        new GenerateWebpWebpackPlugin()
    ]
}
```

# 参数

## test

* **类型**: `{ [path: string]: Function } | RegExp`

* **默认值**: `/\.(png|jpe?g)$/`

* **用法**:

``` javascript
new GenerateWebpWebpackPlugin({
  test: /\.(png|jpe?g)$/
})
```
匹配所有`png`|`jpg`|`jpeg`图片,并生成同名的`webp`图片

## format

* **类型**: `string`

* **默认值**: `[name].webp`

* **用法**:

``` javascript
new GenerateWebpWebpackPlugin({
  format: '[name].[ext].webp'
})
```
将最后输出的图片名称格式化

结果如下：

`./img/bg.png` => `./img/bg.png.webp`

## webpOptions

`webpOptions`是传递给`imagemin-webp`的参数，更多设置可以点击[imagemin-webp](https://github.com/imagemin/imagemin-webp)查看

下面介绍两个常用的参数：

### quality

* **类型**: `{ number }`

* **默认值**: `75`

* **详细**:

`quality`是设置图片质量的参数，区间是`0`~`100`.

* **用法**:

``` javascript
new GenerateWebpWebpackPlugin({
  webpOptions: {
    quality: 75
  }
})
```

### method

* **类型**: `{ number }`

* **默认值**: `4`

* **详细**:

在0（最快）和6（最慢）之间指定要使用的压缩方法。可以在开发环境将速度调快，生产环境使用默认值。

* **用法**:

``` javascript
new GenerateWebpWebpackPlugin({
  webpOptions: {
    method: 0
  }
})
```
