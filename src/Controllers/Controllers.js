import KoaRouter from '../Middleware/KoaRouter';
import AppEndpoint from './Endpoints/AppEndpoint';
import Server from '../App/Server';

/*
An example of our top level controller. This controller is responsible for initializing and aggregating
the major route scopes and binding them without tightly coupling with the underlying routing.
*/
class Controllers {
    constructor() {
        // Base Router
        this.BaseRouter = new KoaRouter();

        // We inject the Model into our AppServer (Which is the Isomorphic controller for our UI)
        this.Server = new Server();

        // And our AppServer into our AppEndpoint (the routed endpoint that will call render from the AppServer on page load)
        this.AppEndpoint = new AppEndpoint(this.Server);
    }

    getRouter() {
        // Here we will bind a loadPage endpoint for the UI side of our Application
        this.BaseRouter.get('/**uris', this.AppEndpoint.loadPage.bind(this.AppEndpoint));

        // And as always, return a Router to the calling scope
        return this.BaseRouter;
    }
}

export default Controllers;