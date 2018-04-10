import context from '../../../__mocks__/ContextMock';
import AppServer from '../../../__mocks__/Components/AppServer';
import AppEndpoint from '../../../Controllers/Endpoints/AppEndpoint';

describe('App Endpoint', () => {
  const TestServer = new AppServer;
  const TestEndpoint = new AppEndpoint(TestServer);

  it('should be an instance of AppEndpoint', () => {
    expect(TestEndpoint).toBeInstanceOf(AppEndpoint);
  });

  it('should return a status code of 200 and a string on render', () => {
    TestEndpoint.loadPage(context);
    expect(context.response.status).toBe(200);
    expect(context.response.body).toBe(AppServer.RESPONSE);
  });
});