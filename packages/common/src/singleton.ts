export function singleton<T>(factory: () => T): () => T {
	let instance: T | undefined;
	return () => instance ?? (instance = factory());
}
