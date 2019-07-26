import loadable from 'loadable-components';

export const routes = [{
    path: '/',
    exact: true,
    component: loadable(() => import('./pages/IndexPage'))
}, {
    path: '/page1',
    exact: true,
    component: loadable(() => import('./pages/Page1'))
}, {
    path: '/page2',
    exact: true,
    component: loadable(() => import('./pages/Page2'))
}, {
    path: '/',
    exact: false,
    component: loadable(() => import('./pages/404'))
}];
