import { loadableReady } from '@loadable/component';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from '../common/view/App';


loadableReady().then(() => {
    ReactDOM.hydrate(
        <BrowserRouter><App/></BrowserRouter>,
        document.querySelector('#root')
    );
});


