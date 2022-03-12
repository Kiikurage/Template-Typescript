import { createEvent } from '../lib/Event';
import { Store } from './Store';

export abstract class AbstractStore<T> implements Store<T> {
    readonly state: T;
    readonly onChange = createEvent<T>();

    protected constructor(initialState: T) {
        this.state = initialState;
    }

    get(): T {
        return this.state;
    }

    set(newState: T | ((oldState: T) => T)) {
        if (newState instanceof Function) {
            (this as { state: T }).state = newState(this.state);
        } else {
            (this as { state: T }).state = newState;
        }
        this.onChange.fire(this.state);
    }
}
