import fs from 'fs';

/*
 NOTE: We do not write tests against our config (though we could).
 Our config should provide static data types, but can potentially have override methodology (CLI, json files, etc)
 */
class Config{
    static getHost(){
        return '127.0.0.1';
    }

    static getPort(){
        return 8799;
    }

    static getSecureHost(){
        return '127.0.0.1';
    }

    static getSecurePort(){
        return 9799;
    }

    static getTLSOptions(){
        return {
            key: fs.readFileSync(`${global.TLS_PATH}/certs/server.key`),
            cert: fs.readFileSync(`${global.TLS_PATH}/certs/server.crt`)
        };
    }
}

export default Config;