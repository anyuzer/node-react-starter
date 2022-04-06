class AppEndpoint {
    /**
     *
     * @param {Server} _AppRootServer
     */
    constructor(_AppRootServer) {
        this.AppRootServer = _AppRootServer;
        this.loadPage = this.loadPage.bind(this);
    }

    async loadPage(_ctx, _next, _routeData) {
        //This is where we attempt to render and can safely capture critical failures with a fallback render.
        try{
            console.time('(Server) Load Page');
            await this.AppRootServer.render(_ctx, false);
            console.timeEnd('(Server) Load Page');
        } catch (e) {
            //And when it fails force an Error page render (which should be "safe") and capture the error

            //Example debug
            // const debugObj = {
            //     userId: UserState.getUserId(),
            //     path: _ctx.request.url,
            //     agent: 'SSR',
            //     errorStack: e.stack,
            //     componentStack: 'SSR'
            // };
            console.log('Caught an error in our SSR tree. Forcing a 500.')
            await this.AppRootServer.render(_ctx, true);
        }
    }
}

export default AppEndpoint;