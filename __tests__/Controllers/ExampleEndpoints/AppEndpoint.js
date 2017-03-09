import ResponseMock from '../../../__mocks__/ResponseMock';
import RequestMock from '../../../__mocks__/RequestMock';
import AppServer from '../../../__mocks__/Components/AppServer';
import AppEndpoint from '../../../src/Controllers/Endpoints/AppEndpoint';

describe('App Endpoint',()=>{
    var response,request,TestEndpoint,TestServer;
    response = new ResponseMock;
    request = new RequestMock;
    TestServer = new AppServer;
    TestEndpoint = new AppEndpoint(TestServer);

    it('should be an instance of AppEndpoint',()=>{
        expect(TestEndpoint).toBeInstanceOf(AppEndpoint);
    });

    it('should return a status code of 200 and a string on render',()=>{
        TestEndpoint.loadPage(request,response);
        expect(response.getStatus()).toBe(200);
        expect(response.getResponseBody()).toBe(AppServer.RESPONSE);
    });
});