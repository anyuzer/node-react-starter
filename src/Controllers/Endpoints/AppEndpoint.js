class AppEndpoint {
    constructor(_AppServer) {
        this.AppServer = _AppServer;
    }

    async loadPage(_ctx, _next) {
        await this.AppServer.render(_ctx);
    }
}

export default AppEndpoint;