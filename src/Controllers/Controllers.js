import KoaRouter from '../Middleware/KoaRouter';
import Server from '../App/Server';
import AppEndpoint from "./Endpoints/AppEndpoint";

/*
    Currently, this backend service only deals with SSR and delivering the app. So all routes are captured and passed into the rendering pipeline.
    We can add a coupled BFF here to deliver specific viewModels to our routes though easily enough. These should be stateless (to ensure proper scaling),
    but only requires adding a BFFEndpoint, and a BFFClient, and then capturing a specific route (ie. /bff/homepage) at which point we have a nicely
    coupled bff.
 */
class Controllers {
    constructor() {
        this.BaseRouter = new KoaRouter();
        this.AppEndpoint = new AppEndpoint(new Server());
    }

    getRouter() {
        //Route through our endpoint, which attempts our SSR
        this.BaseRouter.get('/**uris', this.AppEndpoint.loadPage);
        return this.BaseRouter;
    }
}

export default Controllers;