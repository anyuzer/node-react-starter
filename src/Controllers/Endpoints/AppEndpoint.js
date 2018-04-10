/*
We construct endpoints in a class to give us testability and visibility into each route resolution.
 */
class AppEndpoint {
    constructor(_AppServer) {
        this.AppServer = _AppServer;
    }

    loadPage(_ctx, _next) {
        _ctx.response.status = 200;
        _ctx.response.body = this.AppServer.render();
    }
}

export default AppEndpoint;