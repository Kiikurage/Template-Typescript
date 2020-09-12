import { rgba } from 'polished';
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import CloseIcon from '../assets/close-24px.svg';
import ReloadIcon from '../assets/autorenew-24px.svg';
import { Task } from '../models/Task';
import { ANIMATION_SPIN } from '../styles/animations';

const Base = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    overflow: auto;
    flex: 1 1;
`;

const Item = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    line-height: 32px;
    width: 100%;
    box-sizing: border-box;
    padding: 4px 8px;

    & + & {
        border-top: 1px solid #eee;
    }
`;

type DeleteButtonProps = { disabled: boolean };
const DeleteButton = styled.button<DeleteButtonProps>`
    padding: 4px;
    background: none;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props: DeleteButtonProps) => (props.disabled ? 'disabled' : 'pointer')};
    opacity: 0.3;

    &:hover {
        background: ${(props: DeleteButtonProps) => (props.disabled ? 'none' : rgba('#000', 0.07))};
        opacity: ${(props: DeleteButtonProps) => (props.disabled ? 0.3 : 1)};
    }
`;

const SpinningReloadIcon = styled(ReloadIcon)`
    animation: ${ANIMATION_SPIN} 800ms linear infinite;
    transform-origin: 50% 50%;
`;

const TaskTitle = styled.div`
    font-weight: bold;
    line-height: 1;
    margin-bottom: 4px;
`;

const TaskInfoFooter = styled.footer`
    font-size: 0.75em;
    line-height: 1;
    color: #888;
`;

interface Props {
    tasks: Task[];
    onDelete: (taskId: number) => void;
}

export function TaskList(props: Props): React.ReactElement {
    const { tasks, onDelete } = props;

    return (
        <Base>
            {tasks.map((task) => {
                const isCreating = task.id === -1;

                return (
                    <Item key={`${task.id}:${task.title}`}>
                        <DeleteButton onClick={() => onDelete(task.id)} disabled={isCreating}>
                            {isCreating ? <SpinningReloadIcon /> : <CloseIcon />}
                        </DeleteButton>
                        <div>
                            <TaskTitle>{task.title}</TaskTitle>
                            <TaskInfoFooter>{isCreating ? 'Loading...' : `ID: ${task.id}`}</TaskInfoFooter>
                        </div>
                    </Item>
                );
            })}
        </Base>
    );
}
