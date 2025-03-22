export function assert(
	condition: boolean,
	message = "Assertion failed",
): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

export function assertNotNullish<T>(
	value: T | null | undefined,
	message = "Value is null or undefined",
): asserts value is T {
	assert(value !== null && value !== undefined, message);
}

export function isNullish<T>(
	value: T | null | undefined,
): value is null | undefined {
	return value === null || value === undefined;
}

export function isNotNullish<T>(value: T | null | undefined): value is T {
	return !isNullish(value);
}
