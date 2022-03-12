import { useEffect, useRef, useState } from 'react';
import { Store } from '../../store/Store';

export function useStore<T, V>(store: Store<T>, selector: (state: T) => V): V {
    const [value, setValue] = useState(() => selector(store.get()));
    const selectorRef = useRef<(state: T) => V>(selector);
    selectorRef.current = selector;

    useEffect(() => {
        const onChange = (state: T) => {
            setValue((oldValue) => {
                const newValue = selectorRef.current(state);
                return compareObject(oldValue, newValue) ? oldValue : newValue;
            });
        };

        store.onChange.addListener(onChange);
        return () => {
            store.onChange.removeListener(onChange);
        };
    }, [store]);

    return value;
}

function compareObject(obj1: unknown, obj2: unknown): boolean {
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2;
    if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) return obj1 === obj2;

    for (const k of Object.keys({ ...obj1, ...obj2 })) {
        if ((obj1 as Record<string, unknown>)[k] !== (obj2 as Record<string, unknown>)[k]) return false;
    }

    return true;
}
