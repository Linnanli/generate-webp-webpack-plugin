import type from '../src/utils/type'

describe('test utils', () => {
    test('type validate', () => {
        const func = function () { }
        expect(type.isFunction(func)).toBeTruthy()
        const obj = {}
        expect(type.isPlainObject(obj)).toBeTruthy()
        expect(type.isRegExp(/\s/)).toBeTruthy()
    })
})