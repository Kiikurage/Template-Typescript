import { IEvent } from '../lib/Event';

export interface Store<T> {
    readonly onChange: IEvent<T>;

    get(): T;

    set(newState: T | ((oldState: T) => T)): void;
}
