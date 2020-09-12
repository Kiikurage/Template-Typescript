import { useRef } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { assert } from '../lib/util';
import { COLOR_PRIMARY } from '../styles/constance';

const Base = styled.form`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: stretch;
    gap: 8px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    span {
        color: #888;
        font-size: 0.875em;
        margin-bottom: 4px;
    }
`;

const Input = styled.input`
    padding: 0 16px;
    font-size: 16px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0;
    box-sizing: border-box;
    flex: 1 1;
`;

const Button = styled.button`
    background: ${COLOR_PRIMARY};
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 0 16px;
    line-height: 32px;
    margin: 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;
`;

interface Props {
    onSubmit: (title: string) => void;
}

export function TaskCreateForm(props: Props): React.ReactElement {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        ev.stopPropagation();

        assert(inputRef.current !== null, 'HTMLInputElement should be rendered and not null');
        props.onSubmit(inputRef.current.value);
        inputRef.current.value = '';
    };

    return (
        <Base onSubmit={onSubmit}>
            <Label>
                <span>New Item Title</span>
                <Input type="text" defaultValue="" ref={(e) => (inputRef.current = e)} />
            </Label>
            <Button>CREATE</Button>
        </Base>
    );
}
