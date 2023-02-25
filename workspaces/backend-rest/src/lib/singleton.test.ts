import { singleton } from './singleton';

describe('singleton', () => {
    it('should return the same instance', () => {
        const factory = singleton(() => ({ x: 1 }));

        const instance1 = factory();
        const instance2 = factory();

        expect(instance1).toBe(instance2);
    });
});
