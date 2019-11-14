import { ArcRouter, ArcObject, ArcEvents } from 'arc-lib';

import routeMap from '../@data/routeMap.json';

class Router {
    constructor() {
        ArcEvents.mixin(this);
        this.Router = new ArcRouter(routeMap);
        this.activeRouteObj = undefined;
        this.cache = new ArcObject;
        this.reroute = this.reroute.bind(this);
    }

    loadData(_uri, _pageData) {
        this.reroute(_uri, _pageData);
    }

    async reroute(_uri, _preload, _popstate) {
        const newRouteObj = this.Router.travel(_uri);
        newRouteObj.path = _uri;
        if (!newRouteObj.match) {
            this.activeRouteObj = newRouteObj;
            return [newRouteObj, false];
        }
        if (this.cache[_uri]) {
            this.activeRouteObj = newRouteObj;
            this.emit('reroute', [_uri, newRouteObj, this.cache[_uri].data, _popstate]);
            return [newRouteObj, this.cache[_uri].data];
        }
        let pageResolver;
        switch (newRouteObj.match) {
            case 'homepage': pageResolver = await this._loadHomepage(_uri, newRouteObj, _preload); break;
            default: pageResolver = await this._loadHomepage(_uri, newRouteObj, _preload); break;
        }
        this.emit('reroute', [_uri, pageResolver[0], pageResolver[1], _popstate]);
        return pageResolver;
    }

    async _loadHomepage(_uri, _newRouteObj, _preload) {
        return [_newRouteObj, {}];
    }
}

export default new Router();