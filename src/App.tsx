import { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './view/page/AppShell';
import { MainPage } from './view/page/MainPage';

export const App: FC = () => (
    <HashRouter>
        <Routes>
            <Route path="/" element={<AppShell />}>
                <Route index element={<MainPage />} />
            </Route>
        </Routes>
    </HashRouter>
);
