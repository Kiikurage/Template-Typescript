import { noop } from './noop';

describe('noop', () => {
    it('noop returns undefined', () => {
        expect(noop()).toBe(undefined);
    });
});
