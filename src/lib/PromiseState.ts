interface PendingPromiseState {
    status: 'pending';
    value: undefined;
    error: undefined;
}

interface FulfilledPromiseState<T> {
    status: 'fulfilled';
    value: T;
    error: undefined;
}

interface RejectedPromiseState {
    status: 'rejected';
    value: undefined;
    error: Error;
}

export type PromiseState<T> = PendingPromiseState | FulfilledPromiseState<T> | RejectedPromiseState;

export function promiseState<T>(value?: T, error?: Error): PromiseState<T> {
    return {
        status: value === undefined ? (error === undefined ? 'pending' : 'rejected') : 'fulfilled',
        value: value,
        error: error,
    } as PromiseState<T>;
}
