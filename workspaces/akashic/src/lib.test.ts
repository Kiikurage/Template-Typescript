import { add } from './lib';

describe('lib', () => {
    it('add', () => {
        expect(add(1, 2)).toBe(3);
    });
});
