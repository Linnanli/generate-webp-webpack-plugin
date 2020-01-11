const toString = Object.prototype.toString

exports.isRegExp = (value) => {
    return value instanceof RegExp
}

exports.isFunction = (value) => {
    return value instanceof Function
}

exports.isPlainObject = (value) => {
    return toString.call(value) === '[object Object]'
}