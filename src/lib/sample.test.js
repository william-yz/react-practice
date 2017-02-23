import { add, substract } from './sample'

test('5 + 5 = 10', () => {
    const expected = 10
    const result = add(5, 5);

    expect(result).toEqual(expected)
})

test('15 - 5 = 10', () => {
    const expected = 10
    const result = substract(15, 5);

    expect(result).toEqual(expected)
})