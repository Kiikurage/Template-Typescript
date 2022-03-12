export interface IEvent<T> {
    addListener: (handler: (arg: T) => void) => this;
    removeListener: (handler: (arg: T) => void) => this;
    addOnceListener: (handler: (arg: T) => void) => this;
}

class Event<T> implements IEvent<T> {
    private readonly handlers = new Set<(arg: T) => void>();

    addListener(handler: (arg: T) => void): this {
        this.handlers.add(handler);
        return this;
    }

    removeListener(handler: (arg: T) => void): this {
        this.handlers.delete(handler);
        return this;
    }

    addOnceListener(handler: (arg: T) => void): this {
        const proxy = (arg: T) => {
            handler(arg);
            this.removeListener(proxy);
        };
        return this.addListener(proxy);
    }

    fire(arg: T) {
        this.handlers.forEach((f) => f(arg));
    }
}

export const createEvent = <T>() => new Event<T>();
