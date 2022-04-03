/*
    NOTE: A client app should NEVER have usernames/passwords injected in any form (secret or otherwise) in the config.
    Direct database read/write (or authenticated data orchestration) should happen upstream in an API
 */
export default {
    http: {
        host: process.env.UNIQUE_SERVICE_NAME_HOST || '127.0.0.1',
        port: process.env.UNIQUE_SERVICE_NAME_PORT || 8800
    }
};
