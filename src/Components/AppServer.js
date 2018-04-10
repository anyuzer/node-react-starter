import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Page from './Page';

class AppServer {
    getPageProperties() {
        return {
            title: "Node/React Starter - Example"
        };
    }

    render() {
        return `<!DOCTYPE html>
                ${ReactDOMServer.renderToStaticMarkup(<Page {...this.getPageProperties()} />)}`;
    }
}

module.exports = AppServer;
export default AppServer;