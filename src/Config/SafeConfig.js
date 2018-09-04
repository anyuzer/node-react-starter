class SafeConfig {
    constructor() {
        this.config = {};
    }

    setConfig(_config) {
        this.config = _config;
    }

    getConfig() {
        return this.config;
    }

    setKey(_key, _val) {
        this.config[_key] = _val;
    }

    getKey(_key) {
        return this.config[_key];
    }
}

export default new SafeConfig;