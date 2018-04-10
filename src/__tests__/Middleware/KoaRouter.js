import KoaRouter from '../../Middleware/KoaRouter';

describe('KoaRouter', () => {

    it('should bind a path to every method map', () => {
        const TestRouter = new KoaRouter();
        const TestRouter2 = new KoaRouter();
        TestRouter.get('/test','test');
        TestRouter.get('/test','test');
        TestRouter.head('/test','test');
        TestRouter.patch('/test','test');
        TestRouter.post('/test','test');
        TestRouter.put('/test','test');
        TestRouter2.all('/test','test')
        expect(TestRouter.maps).toEqual(TestRouter2.maps);
    });

    it('should create a top level map based on a subRouter being bound', () => {
        const TestRouter = new KoaRouter();
        const TestRouter2 = new KoaRouter();
        TestRouter2.get('/child', true);
        TestRouter.get('/parent', TestRouter2);
        expect(TestRouter.maps).toEqual({
            get: {
                "/parent/child": true
            }
        });
    });

    it('should not modify the parent map as it has no parent route to bind to', () => {
        const TestRouter = new KoaRouter();
        const TestRouter2 = new KoaRouter();
        TestRouter2.get('/child', true);
        TestRouter.put('/parent', TestRouter2);
        expect(TestRouter.maps).toEqual({
            put: {}

        });
    });

    it('should remove the additional forward slash from the parent', () => {
        const TestRouter = new KoaRouter();
        const TestRouter2 = new KoaRouter();
        TestRouter2.get('/child', true);
        TestRouter.get('/', TestRouter2);
        expect(TestRouter.maps).toEqual({
            get: {
                "/child": true
            }
        });
    });

    it('should remove the additional forward slash from the child', () => {
        const TestRouter = new KoaRouter();
        const TestRouter2 = new KoaRouter();
        TestRouter2.get('/', true);
        TestRouter.get('/parent', TestRouter2);
        expect(TestRouter.maps).toEqual({
            get: {
                "/parent": true
            }
        });
    });

    it('should call the mockMatch function once on get', () => {
        const TestRouter = new KoaRouter();
        const mockCtx = { request : { method: "get", path: "/test" } };
        const mockMatch = jest.fn();
        const mockNext = jest.fn();

        TestRouter.get('/test', mockMatch);
        return TestRouter.intercept(mockCtx, mockNext).then(()=>{
            expect(mockMatch).toHaveBeenCalled();
        });
    });

    it('should call the mockMatch function once on head', () => {
        const TestRouter = new KoaRouter();
        const mockCtx = { request : { method: "head", path: "/test" } };
        const mockMatch = jest.fn();
        const mockNext = jest.fn();

        TestRouter.head('/test', mockMatch);
        return TestRouter.intercept(mockCtx, mockNext).then(()=>{
            expect(mockMatch).toHaveBeenCalled();
        });
    });

    it('should call the mockMatch function once on post', () => {
        const TestRouter = new KoaRouter();
        const mockCtx = { request : { method: "post", path: "/test" } };
        const mockMatch = jest.fn();
        const mockNext = jest.fn();

        TestRouter.post('/test', mockMatch);
        return TestRouter.intercept(mockCtx, mockNext).then(()=>{
            expect(mockMatch).toHaveBeenCalled();
        });
    });

    it('should call the mockMatch function once on patch', () => {
        const TestRouter = new KoaRouter();
        const mockCtx = { request : { method: "patch", path: "/test" } };
        const mockMatch = jest.fn();
        const mockNext = jest.fn();

        TestRouter.patch('/test', mockMatch);
        return TestRouter.intercept(mockCtx, mockNext).then(()=>{
            expect(mockMatch).toHaveBeenCalled();
        });
    });

    it('should call the mockMatch function once on put', () => {
        const TestRouter = new KoaRouter();
        const mockCtx = { request : { method: "put", path: "/test" } };
        const mockMatch = jest.fn();
        const mockNext = jest.fn();

        TestRouter.put('/test', mockMatch);
        return TestRouter.intercept(mockCtx, mockNext).then(()=>{
            expect(mockMatch).toHaveBeenCalled();
        });
    });

    it('should call next when a match is not found', () => {
        const TestRouter = new KoaRouter();
        const mockCtx = { request : { method: "put", path: "/test" } };
        const mockNext = jest.fn();

        return TestRouter.intercept(mockCtx, mockNext).then(()=>{
            expect(mockNext).toHaveBeenCalled();
        });
    });

});
