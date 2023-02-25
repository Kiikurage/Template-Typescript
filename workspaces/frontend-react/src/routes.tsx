import * as React from 'react';
import { createHashRouter } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { Page2 } from './pages/Page2';

export const router = createHashRouter([
    {
        path: '/',
        element: <AppShell />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'page2', element: <Page2 /> },
        ],
    },
]);

export module routes {
    export function getHomePagePath() {
        return '/';
    }

    export function getPage2Path() {
        return '/page2';
    }
}
