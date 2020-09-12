import { useCallback, useMemo } from 'react';
import useSWR from 'swr/esm/use-swr';
import { promiseState, PromiseState } from '../lib/PromiseState';
import * as API from '../models/api';
import { Task } from '../models/Task';

interface TaskStore {
    tasks: PromiseState<Task[]>;
    addTask: (title: string) => void;
    deleteTask: (taskId: number) => void;
}

export function useAppController(): TaskStore {
    const { data: tasks, error: tasksError, mutate: mutateTasks } = useSWR<Task[], Error>('/task/', API.getTasks);

    const submitTask = useCallback(
        (title: string) => {
            void mutateTasks((currentTasks) => {
                void API.createTask(title).then(() => mutateTasks());
                return [...currentTasks, { id: -1, title: title, isClosed: false }];
            });
        },
        [mutateTasks]
    );

    const deleteTask = useCallback(
        (taskId: number) => {
            void mutateTasks((currentTasks) => {
                void API.deleteTask(taskId).then(() => mutateTasks());
                return currentTasks.filter((task) => task.id !== taskId);
            });
        },
        [mutateTasks]
    );

    return {
        tasks: useMemo(() => promiseState(tasks, tasksError), [tasks, tasksError]),
        addTask: submitTask,
        deleteTask: deleteTask,
    };
}
