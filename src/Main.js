/* eslint no-console: 0 */
/* Disable ESLint no-console as this file only runs on server side */
import BodyParser from 'body-parser';
import Koa from 'koa';
import compress from 'koa-compress';

import http2 from 'http2';
import Controllers from './Controllers/Controllers';
import Config from './Config/Config';
import KoaStatic from './Middleware/KoaStatic';
import KoaRouter from './Middleware/KoaRouter';

/*
NOTE: We do not write tests against our Main. Main is our application entry, and builds out our application.
 */
class Main {
    static Run() {
        // Our application
        const App = new Main();
        App.bindSecurityMiddleware()
        .then(App.bindAuthMiddleware.bind(App))
        .then(App.bindStaticMiddleware.bind(App))
        .then(App.bindAppParsingMiddleware.bind(App))
        .then(App.bindApplicationMiddleware.bind(App))
        .then(App.bindErrorMiddleware.bind(App))
        .then(App.startServer.bind(App));
    }

    constructor() {
        this.app = new Koa();
        this.app.use(compress());
        this.Router = new KoaRouter;
        this.StaticServer = new KoaStatic;

        console.log(`Application started with ${Config.getEnvironment()} config`);
    }

    bindSecurityMiddleware() {
        // If I need to handle any top level security concerns. For example, not having http enabled, but catching non TLS requests and redirecting to the correct SecureServer
        console.log('Security middleware bound...');
        return Promise.resolve(true);
    }

    bindAuthMiddleware() {
        // I do sessionID, authentication and cookie management
        console.log('Auth middleware bound...');
        return Promise.resolve(true);
    }

    bindStaticMiddleware() {
        console.log('Static middleware bound...');
        this.StaticServer.addRoute('/assets/**path[/]');
        this.app.use(this.StaticServer.intercept);
        return Promise.resolve(true);
    }

    bindAppParsingMiddleware() {
        console.log('Parsing middleware bound...');
        return Promise.resolve(true);
    }

    bindApplicationMiddleware() {
        const Controller = new Controllers();
        this.Router.all('/', Controller.getRouter());
        this.app.use(this.Router.intercept);
        console.log('Application middleware bound...');
        return Promise.resolve(true);
    }

    bindErrorMiddleware() {
        console.log('Error middleware bound...');
        return Promise.resolve(true);
    }

    startServer() {
        this.Server = http2.createSecureServer(Config.getCertConfig(), this.app.callback());
        this.Server.listen(Config.getHTTPSConfig().port);
        console.log(`Started on port ${Config.getHTTPSConfig().port}`);
    }

    toString() {
        return `[object ${this.constructor.name}]`;
    }
}

export default Main;