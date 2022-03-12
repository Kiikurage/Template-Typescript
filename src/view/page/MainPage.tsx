import { css } from '@emotion/react';
import * as React from 'react';

export function MainPage() {
    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                align-items: stretch;
                justify-content: stretch;
                position: absolute;
                inset: 0;
                padding: 0 48px 0 24px;
                background: #fff;
            `}
        ></div>
    );
}
