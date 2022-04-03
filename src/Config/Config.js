import chalk from 'chalk';
import localConfig from './local';
import developmentConfig from './development';
import stagingConfig from './staging';
import productionConfig from './production';

/**
 * @class Config;
 */
class Config {
    constructor(_environment) {
        this.setEnvironment(_environment);
    }

    // Public
    setEnvironment(_environment) {
        this.environment = _environment.toLowerCase() || 'production';
        this._setConfigObj(this._loadConfig(this.environment));
    }

    getEnvironment() {
        return this.environment;
    }

    getBodyParserConfig() {
        return this.configObj.bodyParser;
    }

    getHTTPConfig() {
        return this.configObj.http;
    }

    reloadConfig(_environment) {
        this.environment = _environment.toLowerCase();
        this._setConfigObj(this._loadConfig(this.environment));
    }

    // Private
    _setConfigObj(_configObj) {
        this.configObj = _configObj;
    }

    _loadConfig(_environment) {
        switch (_environment) {
            case 'development':
                console.log(chalk.greenBright.bold('Loading development config...'));
                return localConfig || developmentConfig;
            case 'staging':
                console.log(chalk.yellowBright.bold('Loading staging config...'));
                return stagingConfig;
            default:
                console.log(chalk.redBright.bold('Loading production config...'));
                return productionConfig;
        }
    }
}

export default new Config(process.env.NODE_ENV || '');