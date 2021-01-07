import { noop } from './util';

describe('noop', () => {
    it('noop returns undefined', () => {
        expect(noop()).toBe(undefined);
    });
});
