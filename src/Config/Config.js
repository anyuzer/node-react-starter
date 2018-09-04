import developmentConfig from './development';
import stagingConfig from './staging';
import productionConfig from './production';

class Config {
    constructor(_environment) {
        this.setEnvironment(_environment);
    }

    // Public
    setEnvironment(_environment) {
        this.environment = _environment.toLowerCase();
        this._setConfigObj(this._loadConfig(this.environment));
    }

    getEnvironment() {
        return this.environment;
    }

    getBodyParserConfig() {
        return this.configObj.bodyParser;
    }

    getCORSConfig() {
        return this.configObj.cors;
    }

    getHTTPConfig() {
        return this.configObj.http;
    }

    getHTTPSConfig() {
        return this.configObj.https;
    }

    getCertConfig() {
        return this.configObj.tls;
    }

    // Private
    _setConfigObj(_configObj) {
        this.configObj = _configObj;
    }

    _loadConfig(_environment) {
        switch (_environment) {
            case 'development':
                return developmentConfig;
            case 'staging':
                return stagingConfig;
            default:
                return productionConfig;
        }
    }
}

export default new Config(process.env.APP_ENV || '');
