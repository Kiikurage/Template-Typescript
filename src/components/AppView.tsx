import * as React from 'react';
import styled from 'styled-components';
import { TaskCreateForm } from './TaskCreateForm';
import { TaskList } from './TaskList';
import { useAppController } from '../controllers/AppController';

const Base = styled.div`
    font-size: 14px;
    font-family: Arial, sans-serif;
    position: relative;
    height: 100%;
    width: 300px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
`;

export function AppView(): React.ReactElement {
    const { tasks, addTask, deleteTask } = useAppController();

    let taskList: React.ReactNode;
    switch (tasks.status) {
        case 'pending':
            taskList = 'Loading...';
            break;

        case 'fulfilled':
            taskList = <TaskList tasks={tasks.value} onDelete={deleteTask} />;
            break;

        case 'rejected':
            taskList = 'Error: Failed to load tasks';
            break;
    }

    return (
        <Base>
            <h1>List</h1>
            <TaskCreateForm onSubmit={addTask} />
            {taskList}
        </Base>
    );
}
