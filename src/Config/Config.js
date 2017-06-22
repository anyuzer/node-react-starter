const fs = require('fs');

const developmentConfig = require('./development');
const stagingConfig = require('./staging');
const productionConfig = require('./production');

const customConfig = (fs.existsSync('./custom.js') ? require('./custom') : false);

class Config{
    constructor(_environment){
        this.setEnvironment(_environment);
    }

    // Public
    setEnvironment(_environment){
        this.environment = _environment.toLowerCase();
        this._setConfigObj(this._loadConfig(this.environment));
    }

    getEnvironment(){
        return this.environment;
    }

    getBodyParserConfig(){
        return this.configObj.bodyParser;
    }

    getCORSConfig(){
        return this.configObj.cors;
    }

    getHTTPConfig(){
        return this.configObj.http;
    }

    getHTTPSConfig(){
        return this.configObj.http;
    }

    // Private
    _setConfigObj(_configObj){
        this.configObj = _configObj;
    }

    _loadConfig(_environment){
        switch (_environment){
        case 'development':
            return developmentConfig;
        case 'staging':
            return stagingConfig;
        case 'custom':
            if (!customConfig){
                this.environment = 'production';
                return productionConfig;
            }
            return customConfig;
        default:
            return productionConfig;
        }
    }
}

module.exports = new Config(process.env.NODE_ENV || '');
