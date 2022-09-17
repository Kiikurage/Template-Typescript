import { isNullish } from './isNullish';

export function assert(condition: boolean, message: string): asserts condition {
    if (!condition) throw new Error(`Assertion Failed: ${message}`);
}

export function assertNotNullish<T>(value: T | null | undefined): asserts value is T {
    if (isNullish(value)) throw new Error(`Assertion Failed: value is nullish`);
}
