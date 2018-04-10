import fs from 'fs';
import { ArcRouter, ArcHash } from 'arc-lib';
import path from 'path';

class KoaStatic {
    constructor() {
        this.Router = new ArcRouter;
        this.rootDir = global.DIST_PATH;
        this.map = {};
        this.intercept = this.intercept.bind(this);
    }

    setRootDir(_rootDir) {
        this.rootDir = _rootDir;
    }

    addRoute(_route) {
        this.map[_route] = true;
        this.Router.setMap(this.map);
    }

    async intercept(_ctx, _next) {
        const routeData = this.Router.travel(_ctx.request.path);
        if (routeData.match) {
            const fullPath = `${this.rootDir}/${routeData.path}`;
            return new Promise((_resolve, _reject) => {
                fs.access(fullPath, fs.constants.R_OK, (_err) => {
                    if (_err) {
                        _resolve(_next());
                    }
                    fs.stat(fullPath, (_err, _stats)=>{
                        const etag = ArcHash.md5(`${_stats.size}${_stats.mtimeMs}`);
                        if(_ctx.request.headers['if-none-match'] === etag){
                            _ctx.response.status = 304;
                            return _resolve();
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

export default KoaStatic;