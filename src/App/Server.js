import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from "styled-components";
import { ArcRouter } from 'arc-lib';

import Html from './Html';
import Provider from './Provider';
import Router from './Router';

import routeMap from '../@data/routeMap.json';

class Server {
    constructor() {
        this.Router = new ArcRouter(routeMap);
    }

    /* eslint max-len: 0 */
    async render(_ctx) {
        try {
            const [routeObj, pageData] = await this._initData(_ctx);

            const sheet = new ServerStyleSheet();
            const body = renderToString(sheet.collectStyles(<Provider routeObj={routeObj} pageData={pageData} />));
            const styles = sheet.getStyleTags();

            _ctx.response.status = 200;
            _ctx.response.body = Html({ body, styles, title: "Title", routeObj, pageData });
        } catch (err) {
            _ctx.response.status = 500;
            _ctx.response.body = "Failed to render";
            console.error(err);
            throw err;
        }
    }

    async _initData(_ctx) {
        let pageResolver = Router.reroute(decodeURI(_ctx.path));
        [pageResolver] = await Promise.all([pageResolver]);
        const [routeObj, pageData] = pageResolver;
        routeObj.path = decodeURI(_ctx.path);

        return [routeObj, pageData];
    }
}

export default Server;