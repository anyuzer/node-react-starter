import Controllers from '../../src/Controllers/Controllers';
import {Router} from 'express';
import {object as ArcObject} from 'arc-lib';

describe('Controllers Class',()=>{
    var TestControllers = new Controllers;
    it('should be instanceOf Controllers',()=>{
        expect(TestControllers).toBeInstanceOf(Controllers);
    });

    it('should return an object that has the same API as express.Router',()=>{
        var ExampleRouter = new Router;
        expect(ArcObject.duckInstanceOf(ExampleRouter,TestControllers.getRouter())).toBe(true);
    });
});
