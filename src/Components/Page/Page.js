import React from 'react';

/*
Having a Page as a component is nice, as it maintains coding sensibility and consistency but there are a few key differences to be aware of when doing this
    -This component only ever gets rendered from the server side and is not included as part of our Client app
    -While we use the data available on the server initially to render out static output, we must also make the data available to our client app
    -We use dangerouslySetInnerHTML as a special methodology provided by React to set raw unescaped data into the DOM.
        -It would be an XSS concern if we were ever doing it on the client side, but it is safe on the server side
    -props.content is a react rendered output. This is the same content that is rendered by our AppClient and attached to the app-mount element
 */
class Page extends React.Component{
    getAppData(){
        return JSON.stringify(this.props.app);
    }

    getInitData(){
        return `
            window.app = ${this.getAppData()};
        `;
    }

    getInitScript(){
        return {
            type: "text/javascript",
            dangerouslySetInnerHTML: {
                __html: this.getInitData()
            }
        };
    }

    getAppMount(){
        return {
            id: "app-mount",
            dangerouslySetInnerHTML: {
                __html: this.props.content
            }
        };
    }

    render(){
        // We would not want to do this in the client bundle but as we're using React for the Page shell, this is safe
        return (
          <html lang="en">
            <head>
              <title>{this.props.title}</title>
              <link href="app/app.css" rel="stylesheet" type="text/css" />
              <script {...this.getInitScript()} />
            </head>
            <body>
              <div {...this.getAppMount()} />
              <script src="/app/app.bundle.js" />
            </body>
          </html>
        );
    }
}

Page.defaultProps = {
    app: {},
    content: "",
    title: ""
};

Page.propTypes = {
    app: React.PropTypes.object,
    content: React.PropTypes.string,
    title: React.PropTypes.string
};

export default Page;
