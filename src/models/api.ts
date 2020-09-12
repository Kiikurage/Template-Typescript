import { Task } from './Task';

/**
 * Mock API: Each endpoint delays 1 second to respond.
 */
const LOCAL_STORAGE_KEY = 'Tasks';
const API_DELAY_IN_MILLISECONDS = 1000;

function sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function saveTasksToLocalStorage(tasks: Task[]): void {
    const json = JSON.stringify(tasks);
    return localStorage.setItem(LOCAL_STORAGE_KEY, json);
}

function loadTasksFromLocalStorage(): Task[] {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!json) return [];

    return JSON.parse(json) as Task[];
}

export async function getTasks(): Promise<Task[]> {
    await sleep(API_DELAY_IN_MILLISECONDS);

    return loadTasksFromLocalStorage();
}

export async function createTask(title: string): Promise<Task> {
    await sleep(API_DELAY_IN_MILLISECONDS);

    const tasks = loadTasksFromLocalStorage();
    const newTask: Task = {
        id: Date.now(),
        title: title,
        isClosed: false,
    };

    saveTasksToLocalStorage([...tasks, newTask]);
    return newTask;
}

export async function deleteTask(taskId: number): Promise<void> {
    await sleep(API_DELAY_IN_MILLISECONDS);

    const tasks = loadTasksFromLocalStorage();

    saveTasksToLocalStorage(tasks.filter((task) => task.id !== taskId));
}
