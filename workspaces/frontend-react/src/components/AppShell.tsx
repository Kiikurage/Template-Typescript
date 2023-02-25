import { css } from '@emotion/react';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { routes } from '../routes';

export const AppShell: FC = () => {
    return (
        <div
            css={css`
                inset: 0;
                position: absolute;
                display: grid;
                grid-template-rows: auto 1fr;
            `}
        >
            <header
                css={css`
                    height: 48px;
                    padding: 0 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border-bottom: 1px solid #ccc;
                `}
            >
                <Link
                    css={css`
                        text-decoration: none;
                        color: inherit;
                    `}
                    to={routes.getHomePagePath()}
                >
                    <h1
                        css={css`
                            font-size: 24px;
                            margin: 0;
                        `}
                    >
                        App
                    </h1>
                </Link>
            </header>
            <div
                css={css`
                    overflow: auto;
                `}
            >
                <Outlet />
            </div>
        </div>
    );
};
