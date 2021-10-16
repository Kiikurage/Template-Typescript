import { assert } from './assert';

describe('assert', () => {
    it('When assertion passed, error should not be thrown', () => {
        expect(() => {
            assert(true, 'message');
        }).not.toThrow();
    });

    it('When assertion failed, error should be thrown', () => {
        expect(() => {
            assert(false, 'message');
        }).toThrow();
    });
});
