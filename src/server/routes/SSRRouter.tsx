import { ChunkExtractor } from '@loadable/server';
import { Request, Response, Router } from 'express';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import { App } from '../../common/view/App';

export const SSRRouter = Router();

function renderHTML(markup: string, scripts: string, links: string, styles: string) {
    return `
<html>
<head>
    <meta charset="UTF-8">
    ${ scripts }
    ${ links }
    ${ styles }
</head>
<body>
<div id="root">${ markup }</div>
</body>
</html>
`;
}

SSRRouter.use(async (req: Request, res: Response) => {
    const loadableComponentExtractor = new ChunkExtractor({
        statsFile: path.resolve(__dirname, '../../static/loadable-stats.json')
    });
    const styledComponentExtractor = new ServerStyleSheet();
    const reactRouterContext: StaticRouterContext = {};

    const markup = ReactDOMServer.renderToString(
        loadableComponentExtractor.collectChunks(
            styledComponentExtractor.collectStyles(
                <StaticRouter location={ req.url } context={ reactRouterContext }>
                    <App/>
                </StaticRouter>
            )
        )
    );

    const scripts = loadableComponentExtractor.getScriptTags();
    const links = loadableComponentExtractor.getLinkTags();
    const styles = loadableComponentExtractor.getStyleTags() + styledComponentExtractor.getStyleTags();

    if (reactRouterContext.url) {
        res.redirect(301, reactRouterContext.url);

    } else {
        res.send(renderHTML(markup, scripts, links, styles));
    }
});
