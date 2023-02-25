import { css } from '@emotion/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

export const HomePage: FC = () => {
    return (
        <div
            css={css`
                padding: 32px 64px;
            `}
        >
            <h2>Home</h2>
            <Link to={routes.getPage2Path()}>Page2</Link>
        </div>
    );
};
