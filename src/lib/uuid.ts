export type UUID = string;

function v4(): UUID {
    return `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
}

export const UUID = { v4 };
