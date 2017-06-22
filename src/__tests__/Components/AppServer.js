const AppServer = require('../../Components/AppServer');
const is = require('arc-lib').is;

describe('AppServer', () => {
  const TestServer = new AppServer;
  it('should return an object', () => {
    expect(is(TestServer.getPageProperties(), true)).toBe('Object');
  });

  it('should return a string', () => {
    expect(is(TestServer.render(), true)).toBe('String');
  });
});