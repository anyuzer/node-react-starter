/*
We construct endpoints in a class to give us testability and visibility into each route resolution.
 */
class AppEndpoint{
    constructor(_AppServer){
        this.AppServer = _AppServer;
    }

    loadPage(_request, _response){
        _response.status(200).send(this.AppServer.render());
    }
}

export default AppEndpoint;