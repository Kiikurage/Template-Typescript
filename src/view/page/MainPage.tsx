import { css } from '@emotion/react';
import { FC } from 'react';

export const MainPage: FC = () => (
    <div
        css={css`
            position: absolute;
            inset: 0;
            background: #fff;
        `}
    >
        Hello World
    </div>
);
