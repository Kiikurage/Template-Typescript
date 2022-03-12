export function singleton<T>(factory: () => T): () => T {
    let instance: T | null = null;

    return () => (instance ??= factory());
}
