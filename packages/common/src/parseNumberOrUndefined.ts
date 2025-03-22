export function parseNumberOrUndefined(
	value: string | undefined,
): number | undefined {
	return value === undefined ? undefined : Number(value);
}
