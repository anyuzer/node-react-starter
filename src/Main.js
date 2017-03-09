/* eslint no-console: 0 */
/* Disable ESLint no-console as this file only runs on server side */
import BodyParser from 'body-parser';
import Express from 'express';

import HTTPServer from './Adapters/HTTPServer';
import Controllers from './Controllers/Controllers';
import Config from './Config';

/*
NOTE: We do not write tests against our Main. Main is our application entry, and builds out our application.
 */
class Main{
    static Run(){
        // Our application
        const App = new Main();

        // Middlware is order specific. In this case, we use a promise chain to allow setup to be appropriate async
        App.bindSecurityMiddleware()
            .then(App.bindAuthMiddleware.bind(App))
            .then(App.bindStaticMiddleware.bind(App))
            .then(App.bindAppParsingMiddleware.bind(App))
            .then(App.bindApplicationMiddleware.bind(App))
            .then(App.bindErrorMiddleware.bind(App));
    }

    constructor(){
        // A non TLS server
        this.Server = new HTTPServer();
        this.Server.setHost(Config.getHost());
        this.Server.setPort(Config.getPort());
        this.Server.setAttemptLimit(5);
        this.Server.start();

        // A TLS server
        // NOTE: This is only an example. In production scalable environments HTTPS is better handled at the load balancer
        // this.SecureServer = new HTTPServer;
        // this.SecureServer.setHost(Config.getSecureHost());
        // this.SecureServer.setPort(Config.getSecurePort());
        // this.SecureServer.setTLSOptions(Config.getTLSOptions());
        // this.SecureServer.setAttemptLimit(5);
        // this.SecureServer.start();
    }

    bindSecurityMiddleware(){
        // If I need to handle any top level security concerns. For example, not having http enabled, but catching non TLS requests and redirecting to the correct SecureServer
        console.log('Security middleware bound...');
        return Promise.resolve(true);
    }

    bindAuthMiddleware(){
        // I do sessionID, authentication and cookie management
        console.log('Auth middleware bound...');
        return Promise.resolve(true);
    }

    bindStaticMiddleware(){
        // I am a static fileserver. I can be below our dynamic requests, as a fallout scenario (lets me overwrite static content with dynamic controllers) or above (check static first)
        this.Server.catchRequest().use(Express.static(global.DIST_PATH));
        console.log('Static middleware bound...');
        return Promise.resolve(true);
    }

    bindAppParsingMiddleware(){
        // In the case of request transformation prior to the application
        this.Server.catchRequest().use(BodyParser.json());
        this.Server.catchRequest().use(BodyParser.urlencoded({ extended: true }));

        // this.SecureServer.catchRequest().use(BodyParser.json());
        // this.SecureServer.catchRequest().use(BodyParser.urlencoded({extended:true}));
        console.log('Parsing middleware bound...');
        return Promise.resolve(true);
    }

    bindApplicationMiddleware(){
        const Controller = new Controllers();
        this.Server.catchRequest().use('/', Controller.getRouter());
        console.log('Application middleware bound...');
        return Promise.resolve(true);
    }

    bindErrorMiddleware(){
        // Some low generics
        this.Server.attachMiddleware(this._generic404Handler);
        this.Server.attachMiddleware(this._generic500Handler);
        // this.SecureServer.attachMiddleware(this._generic404Handler);
        // this.SecureServer.attachMiddleware(this._generic500Handler);
        console.log('Error middleware bound...');
        return Promise.resolve(true);
    }

    _generic404Handler(_request, _response, _next){
        _response.status(404).end("Could not resolve API: Not Found");
    }

    _generic500Handler(_error, _request, _response, _next){
        console.log(_error.stack);
        _response.status(500).end(`${_error.message} - Could not resolve API: Error`);
    }

    toString(){
        return `[object ${this.constructor.name}]`;
    }
}

export default Main;