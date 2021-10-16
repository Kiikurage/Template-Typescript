import { css } from '@emotion/css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <div
            className={css`
                background: #f00;

                &:hover {
                    background: #00f;
                }
            `}
        >
            Hello World
        </div>,
        document.getElementById('root')
    );
});
