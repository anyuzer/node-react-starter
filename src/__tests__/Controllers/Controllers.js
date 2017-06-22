import { Router } from 'express';
import { ArcObject } from 'arc-lib';
import Controllers from '../../Controllers/Controllers';

describe('Controllers Class', () => {
  const TestControllers = new Controllers;
  it('should be instanceOf Controllers', () => {
    expect(TestControllers).toBeInstanceOf(Controllers);
  });

  it('should return an object that has the same API as express.Router', () => {
    const ExampleRouter = new Router;
    expect(ArcObject.duckType(ExampleRouter, TestControllers.getRouter())).toBe(true);
  });
});
