const fs = require('fs');
const { ArcRouter, ArcHash } = require('arc-lib');
const path = require('path');

class KoaStatic {
    constructor() {
        this.Router = new ArcRouter;
        this.rootDir = path.resolve(`${__dirname}`);
        console.log(this.rootDir);
        this.map = {};
        this.intercept = this.intercept.bind(this);
    }

    setRootDir(_rootDir) {
        this.rootDir = _rootDir;
    }

    addRoute(_route, _options) {
        this.map[_route] = _options || true;
        this.Router.setMap(this.map);
    }

    _buildPathToStatic(_routeData, _pathToStaticArray) {
        return _pathToStaticArray.reduce((_path, _routeKey) => {
            const routeDecoded = decodeURIComponent(_routeData[_routeKey] || _routeKey);
            return `${_path}/${routeDecoded}`;
        }, "");
    }

    async intercept(_ctx, _next) {
        const routeData = this.Router.travel(_ctx.request.path);
        if (routeData.match) {
            const pathToStatic = this._buildPathToStatic(routeData, routeData.match.pathToStatic);
            const fullPath = `${this.rootDir}${pathToStatic}`;
            //If you're not sure how the mapping works, uncomment this: console.log(pathToStatic, fullPath);
            return new Promise((_resolve, _reject) => {
                fs.access(fullPath, fs.constants.R_OK, (_err) => {
                    if (_err) {
                        console.log(_err);
                        _ctx.response.status = 404;
                        _ctx.response.body = 'NOT FOUND';
                        return _resolve();
                    }
                    fs.stat(fullPath, (_suberr, _stats) => {
                        const etag = ArcHash.md5(`${_stats.size}${_stats.mtimeMs}`);
                        if (_ctx.request.headers['if-none-match'] === etag) {
                            _ctx.response.status = 304;
                            return _resolve();
                        }
                        if (routeData.match.maxAge) {
                            _ctx.response.set('cache-control', `max-age=${routeData.match.maxAge}`);
                        }
                        _ctx.response.set('ETag', etag);
                        _ctx.response.type = path.extname(fullPath);
                        _ctx.response.body = fs.createReadStream(fullPath);
                        return _resolve();
                    });
                });
            });
        }
        return _next();
    }
}

module.exports = KoaStatic;
