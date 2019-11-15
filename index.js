import path from 'path';

global.APP_PATH = path.resolve(`${__dirname}/src`);
global.TLS_PATH = path.resolve(`${__dirname}/tls`);
global.DIST_PATH = path.resolve(`${__dirname}`);

/* eslint import/first: 0 */
import Main from './src/Main';

Main.Run();