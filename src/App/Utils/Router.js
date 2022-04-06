import { ArcRouter, ArcObject, ArcEvents } from 'arc-lib';
import ExampleClient from "../../Adapters/ExampleClient";

import routeMap from '../../@data/routeMap.json';

class Router {
    constructor() {
        ArcEvents.mixin(this);
        this.Router = new ArcRouter(routeMap);
        this.reroute = this.reroute.bind(this);
    }

    //Not async, but also doesn't return anything.
    loadData(_uri, _pageData) {
        this.reroute(_uri, _pageData);
    }

    async reroute(_uri, _popstate) {
        //Decode our URI in case it comes directly from the browser. Travel our route map.
        const newRouteObj = this.Router.travel(decodeURI(_uri));

        //Set our path on our route object for future reference.
        newRouteObj.path = _uri;

        //If we didn't get a match, we return our route object and our PageData as "false".
        if (!newRouteObj.match) {
            return [newRouteObj, false];
        }

        //Our "pageResolver" has two values, our "route" and our "pageData".
        let pageResolver;
        switch (newRouteObj.match) {
            case 'homepage':
                pageResolver = await this._loadHomepage(_uri, newRouteObj);
                break;

            case 'products':
                pageResolver = await this._loadProducts(_uri, newRouteObj);
                break;

            case 'pricing':
                pageResolver = await this._loadPricing(_uri, newRouteObj);
                break;

            default:
                pageResolver = [newRouteObj, false];
                break;
        }

        //We emit a reroute to our SPA (if it cares)
        this.emit('reroute', [_uri, pageResolver[0], pageResolver[1], _popstate]);

        //But also return it (if we're doing root rendering)
        return pageResolver;
    }

    //Load a singular viewModel at the top level, rerender.
    async _loadHomepage(_uri, _newRouteObj) {
        return [
            _newRouteObj,
            []
        ]
    }

    async _loadProducts(_uri, _newRouteObj) {
        return [
            _newRouteObj,
            []
        ]
    }

    async _loadPricing(_uri, _newRouteObj) {
        return [
            _newRouteObj,
            []
        ]
    }
}

export default new Router();