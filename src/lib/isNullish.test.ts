import { isNotNullish, isNullish } from './isNullish';

describe('isNullish and isNotNullish', () => {
    it.each([
        [null, true],
        [undefined, true],
        [true, false],
        [false, false],
        [0, false],
        ['', false],
        ['false', false],
        ['null', false],
        ['undefined', false],
        [NaN, false],
        [Infinity, false],
    ])(`[%#] isNullish(%j) === %s`, (value, isExpectedToBeNullish) => {
        expect(isNullish(value)).toBe(isExpectedToBeNullish);
        expect(isNotNullish(value)).not.toBe(isExpectedToBeNullish);
    });
});
