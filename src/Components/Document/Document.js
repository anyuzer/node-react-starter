import React from 'react';
import serialize from 'serialize-javascript';
import theme from '../AppStyle/theme';

class Document extends React.Component {
    getAppEnv() {
        return {
            type: "text/javascript",
            dangerouslySetInnerHTML: {
                __html: `window.APP_ENV = ${serialize(this.props.env, { isJSON: true })};`
            }
        };
    }

    getInitScript() {
        return {
            type: "text/javascript",
            dangerouslySetInnerHTML: {
                __html: `window.app = ${serialize(this.props.app, { isJSON: true })};`
            }
        };
    }

    getCSSIds() {
        return {
            type: "text/javascript",
            dangerouslySetInnerHTML: {
                __html: `window.cssids = ${serialize(this.props.cssIds, { isJSON: true })}`
            }
        };
    }

    getAppMount() {
        return {
            id: "app-mount",
            dangerouslySetInnerHTML: {
                __html: this.props.content
            }
        };
    }

    getStyles() {
        return {
            type: "text/css",
            dangerouslySetInnerHTML: {
                __html: this.props.css
            }
        };
    }

    getFonts(cdnURL) {
        return {
            type: "text/css",
            dangerouslySetInnerHTML: {
                __html: theme.fonts.inlineEmbed()
            }
        };
    }

    render() {
        // We would not want to do this in the client bundle but as we're using React for the Document shell, this is safe
        const cdnURL = '';
        return (
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content="A page" />
                    <title>{this.props.title}</title>
                    <script {... this.getAppEnv()} />
                    <script {...this.getInitScript()} />
                    <script {...this.getCSSIds()} />
                    <style {...this.getFonts(cdnURL)} />
                    <style {... this.getStyles()} />
                </head>
                <body>
                    <div {...this.getAppMount()} />
                    <script src="/assets/app/app.bundle.js" />
                </body>
            </html>
        );
    }
}

export default Document;