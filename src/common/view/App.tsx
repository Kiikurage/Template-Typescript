import * as React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from './routes';

export class App extends React.Component {
    render() {
        return (
            <Switch>
                { routes.map((route) => (<Route key={ route.path } { ...route } />)) }
            </Switch>
        );
    }
}
