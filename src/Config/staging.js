/*
    NOTE: A client app should NEVER have usernames/passwords injected in any form (secret or otherwise) in the config.
    Direct database read/write should happen upstream in an API
 */
export default {
    http: {
        host: process.env.UNIQUE_SERVICE_NAME_HOST || '0.0.0.0',
        port: process.env.UNIQUE_SERVICE_NAME_PORT || 8800
    }
};
