import { singleton } from './singleton';

describe('singleton', () => {
    it('should not instantiate until accessed', () => {
        const mockFactory = jest.fn();
        singleton(mockFactory);

        expect(mockFactory.mock.calls.length).toBe(0);
    });

    it('should return the same instance', () => {
        const fn = singleton(() => ({}));

        const instance1 = fn();
        const instance2 = fn();
        expect(instance1).toBe(instance2);
    });
});
