import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from "styled-components";
import {ArcHash, ArcRouter} from 'arc-lib';

import Config from '../Config/Config';
import Html from './Body/Html';
import Provider from './Body/Provider';
import Router from './Utils/Router';
import MetaResolver from './Utils/MetaResolver'

import routeMap from '../@data/routeMap.json';

/**
 *
 * @class Server
 */
class Server {
    constructor() {
        this.Router = new ArcRouter(routeMap);
        this.render = this.render.bind(this);
    }

    async render(_ctx, _forceRenderError) {
        let routeData, pageData, userProfile;

        //1a. If something has gone critically wrong on the server side. Just skip everything and force render an error page.
        if(_forceRenderError){
            pageData = [];
            routeData = this.Router.travel(_ctx.request.url);
            routeData.match = "500";
        } else {
            //1b. If not, do our top level data resolution. People like doing this in React components. I do not.
            console.time('(Server) Init Data');
            [routeData, pageData, userProfile] = await this._initData(_ctx);
            console.timeEnd('(Server) Init Data');
        }

        //2. At this point, we have our routeData, our pageData, our userData if necessary, render our app tree.
        console.time('(Server) Render');
        const TagResolver = new MetaResolver(routeData);
        const sheet = new ServerStyleSheet();
        const body = renderToString(sheet.collectStyles(<Provider metaResolver={TagResolver} routeData={routeData} pageData={pageData} />));
        const styles = sheet.getStyleTags();

        const [title, ogTitle, ogType, ogUrl, ogImage, ogDescription] = await Promise.all([
            TagResolver.getTitle(),
            TagResolver.getOGTitle(),
            TagResolver.getOGType(),
            TagResolver.getOGUrl(),
            TagResolver.getOGImage(),
            TagResolver.getOGDescription()
        ]);
        console.timeEnd('(Server) Render');

        //3. Ensure we have the right response status, as well as allow our page content to resolve anything it wants around our meta state. Inject it into our HTML.
        const html = Html(
            { body, styles, title, routeData, pageData, userProfile },
            { ogTitle, ogType, ogUrl, ogImage, ogDescription},
            Config.getEnvironment()
        );

        const etag = ArcHash.md5(html);
        if (_ctx.request.headers['if-none-match'] === etag) {
            console.log('Cached page...');
            _ctx.response.status = 304;
            return;
        }

        _ctx.response.set('ETag', etag);
        _ctx.response.status = this._getResponseStatus(routeData);
        _ctx.response.body = html;
    }

    async _initData(_ctx) {
        let userProfile = {};
        let routeData, pageData = [];
        try{
            /*
                //Authenticate our user here. This is generally a separate upstream call, which we do prior to calling other APIs and deciding the render tree.
                userProfile = await UserGateway.checkUser();

                //Assuming we got a user, we deserialize it globally
                UserState.deserialize(userProfile);
             */
            [routeData, pageData] = await Router.reroute(decodeURI(_ctx.request.url));
        }
        catch(e) {
            //Now, it's possible something goes wrong in our data tree. This is server side, prerender. Here we can modify our render target to be an error page.
            routeData = this.Router.travel(_ctx.request.url); //Get the right route

            //We would probably want to capture the error here and not swallow it.
            console.log(e);

            switch(e.message) {
                case '401':
                case '404':
                    //Not found
                    routeData.match = e.message;
                    break;

                default:
                    routeData.match = '500';
                    break;
            }
        }
        return [routeData, pageData, userProfile];
    }

    _getResponseStatus(_routeData) {
        switch(_routeData.match) {
            case '404':
            case '401':
            case '500':
                return +_routeData.match;

            default:
                return 200;
        }
    }
}

export default Server;