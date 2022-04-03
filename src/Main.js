import http from 'http';

import Koa from 'koa';
import cors from '@koa/cors';
import chalk from 'chalk';

import Controllers from './Controllers/Controllers';
import Config from './Config/Config';
import KoaStatic from './Middleware/KoaStatic';
import KoaRouter from './Middleware/KoaRouter';

/*
NOTE: We do not write tests against our Main. Main is our application entry, and builds out our application.
 */
class Main {
    static async Run() {
        // Our application
        const App = new Main();
        await App.initRemote();
        await App.bindSecurityMiddleware();
        await App.bindAuthMiddleware();
        await App.bindStaticMiddleware();
        await App.bindAppParsingMiddleware();
        await App.bindRequestRoutes();
        App.startServer();
    }

    constructor() {
        this.Router = new KoaRouter;
        this.StaticServer = new KoaStatic;
        this.app = new Koa();
    }

    async initRemote() {
        //If we need to fetch any remote configs / data / etc on boot
        console.log('Initializing remote connections...');
        return true;
    }

    async bindSecurityMiddleware() {
        // If there's high level security checks we want to do, to prevent malicious requests
        console.log('Security middleware bound...');
        this.app.use(cors({ origin: "*" }));
        return true;
    }

    async bindAuthMiddleware() {
        //This server generally should be seen as publicly facing. Generally auth should be implemented in upstream APIs, which when checked resolved the correct UI
        console.log('Auth middleware bound...');
        return true;
    }

    async bindStaticMiddleware() {
        console.log('Static middleware bound...');

        /*
            This can look a bit confusing, but maps variable routes to the correct internal path. The first
            argument to addRoute is a arc-router route (/robots.txt is an explicit match), and the options
            argument create an internal mapping to where the file should be.

            As the internal mapping is relative from where the service is being started from (/dist), it maps
            relatively from there. In the case of ['app','robots.txt'] it says that /robots.txt should look
            at /dist/app/robots.txt

            The third route has **path as recursive variable match, which is then used a variable to create
            the static path. So a request for /assets/icons/brand/facebook.svg would map to
            /dist/app/assets/icons/brand/facebook.svg.

            If a file is found, it responds with a stream and completes the response. If not, it calls next()
            and continues in the middleware chain.

            As a general rule, beyond serving the app.bundle.js, other assets should be handled by a cdn.
         */
        this.StaticServer.addRoute('/robots.txt', { pathToStatic: ['app', 'robots.txt'] });
        this.StaticServer.addRoute('/favicon.ico', { pathToStatic: ['app', 'favicon.ico'] });
        this.StaticServer.addRoute('/assets/**path[/]', { pathToStatic: ['app', 'path'] });
        this.app.use(this.StaticServer.intercept);
        return true;
    }

    async bindAppParsingMiddleware() {
        // In the case of request transformation prior to the application
        console.log('Parsing middleware bound...');
        return true;
    }

    async bindRequestRoutes() {
        // Our application routing, and request handling
        const Controller = new Controllers();
        const rootPath = '/';
        this.Router.all(rootPath, Controller.getRouter());
        this.app.use(this.Router.intercept);
        console.log(`Request routes bound to root path: ${chalk.cyanBright.bold(`${rootPath}*`)}`);
        return true;
    }

    startServer() {
        this.Server = http.createServer(this.app.callback());
        this.Server.listen(
            Config.getHTTPConfig().port,
            Config.getHTTPConfig().host
        );
        console.log(`Started on port ${Config.getHTTPConfig().port}`);
    }
}

Main.Run();