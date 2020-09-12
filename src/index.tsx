import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppView } from './components/AppView';

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<AppView />, document.getElementById('root'));
});
