import ResponseMock from '../../../__mocks__/ResponseMock';
import RequestMock from '../../../__mocks__/RequestMock';
import AppServer from '../../../__mocks__/Components/AppServer';
import AppEndpoint from '../../../Controllers/Endpoints/AppEndpoint';

describe('App Endpoint', () => {
  const response = new ResponseMock;
  const request = new RequestMock;
  const TestServer = new AppServer;
  const TestEndpoint = new AppEndpoint(TestServer);

  it('should be an instance of AppEndpoint', () => {
    expect(TestEndpoint).toBeInstanceOf(AppEndpoint);
  });

  it('should return a status code of 200 and a string on render', () => {
    TestEndpoint.loadPage(request, response);
    expect(response.getStatus()).toBe(200);
    expect(response.getResponseBody()).toBe(AppServer.RESPONSE);
  });
});