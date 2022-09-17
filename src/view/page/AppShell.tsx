import { css } from '@emotion/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const AppShell: FC = () => (
    <div
        css={css`
            position: fixed;
            inset: 0;
        `}
    >
        <Outlet />
    </div>
);
