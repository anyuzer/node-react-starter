import fs from 'fs';

const tlsKey = (fs.existsSync(`${__dirname}/tls/certs/server.key`) ? fs.readFileSync(`${__dirname}/tls/certs/server.key`) : undefined);
const tlsCert = (fs.existsSync(`${__dirname}/tls/certs/server.crt`) ? fs.readFileSync(`${__dirname}/tls/certs/server.crt`) : undefined);

export default {
    bodyParser: {
        limit: '100kb'
    },
    cors: {
        exposedHeaders: ['Link']
    },
    http: {
        host: '0.0.0.0',
        port: 8799
    },
    https: {
        host: '0.0.0.0',
        port: 9799
    },
    tls: {
        key: tlsKey,
        cert: tlsCert
    }
};
