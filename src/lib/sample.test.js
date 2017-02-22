import { add } from './sample'

test('add function should add two params', () => {
    const expected = 10,
        result = add(5, 5);

    expect(result).toEqual(expected)
})