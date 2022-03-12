import * as React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './view/page/MainPage';

export function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<MainPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}
