import { uuid } from './uuid';

describe('uuid', () => {
    it('should generate unique values', () => {
        const N = 1e5;
        const uuids = new Set<string>();

        for (let i = 0; i < N; i++) uuids.add(uuid());

        expect(uuids.size).toBe(N);
    });
});
