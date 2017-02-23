import { add, substract } from './sample'

test('add function should add two params', () => {
    const expected = 10
    const result = add(5, 5);

    expect(result).toEqual(expected)
})

test('substract function should substract param one from param two', () => {
    const expected = 10
    const result = substract(15, 5);

    expect(result).toEqual(expected)
})