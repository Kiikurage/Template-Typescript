export function isNullish<T>(x: T | null | undefined): x is null | undefined {
    return x === null || x === undefined;
}

export function isNotNullish<T>(x: T | null | undefined): x is T {
    return !isNullish(x);
}
