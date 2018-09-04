import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ThemeProvider } from 'glamorous';
import { renderStatic as GlamorousSSRRender } from 'glamor/server';
import { ArcRouter } from 'arc-lib';

import SafeConfig from '../Config/SafeConfig';
import Document from './Document';
import AppManager from "./AppManager/AppManager";
import routeMap from '../@data/routeMap.json';
import theme from './AppStyle/theme';

class AppServer {
    constructor() {
        this.Router = new ArcRouter(routeMap);
    }

    getPageProperties(_AppTree, _routeObj) {
        const { html, css, ids } = GlamorousSSRRender(() => ReactDOMServer.renderToString(_AppTree));
        return {
            title: "A page",
            env: process.env.APP_ENV,
            content: html,
            css,
            cssIds: ids,
            app: {
                config: SafeConfig.getConfig(),
                routeObj: _routeObj
            }
        };
    }

    /* eslint max-len: 0 */
    async render(_ctx) {
        try {
            const routeObj = this.Router.travel(decodeURI(_ctx.path));
            routeObj.path = _ctx.path;
            if (!routeObj.match) {
                _ctx.response.status = 404;
                return false;
            }
            const AppTree = this._getAppTree(routeObj);
            _ctx.response.status = 200;
            _ctx.response.body = `<!DOCTYPE html>`;
            _ctx.response.body = ReactDOMServer.renderToNodeStream(<Document {...this.getPageProperties(AppTree, routeObj)} />);
        } catch (err) {
            _ctx.response.status = 500;
            _ctx.response.body = "Failed to render";
            console.error(err);
            throw err;
        }
    }

    _getAppTree(_routeObj) {
        return (
            <ThemeProvider theme={theme}>
                <AppManager
                    routeObj={_routeObj}
                />
            </ThemeProvider>
        );
    }
}

export default AppServer;