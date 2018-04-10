import KoaRouter from '../../Middleware/KoaRouter';
import Controllers from '../../Controllers/Controllers';

describe('Controllers Class', () => {
  const TestControllers = new Controllers;
  it('should be instanceOf Controllers', () => {
    expect(TestControllers).toBeInstanceOf(Controllers);
  });

  it('should return an object that has the same API as express.Router', () => {
    expect(TestControllers.getRouter()).toBeInstanceOf(KoaRouter);
  });
});
