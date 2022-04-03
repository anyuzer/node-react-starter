import React from 'react';

import HomePage from "./Content/HomePage";
import NotFoundPage from "./Content/NotFoundPage";
import ErrorPage from "./Content/ErrorPage";

class Pages extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.routeData.path !== this.props.routeData.path) {
            //In single page apps, the browser requires some help to make "soft loads" feel like "hard loads".
            window.scrollTo(0,0);
        }
    }

    getLayout(_page) {
        /*
            Our "page" is our core content around our app skeleton. We provide many paths for 500s and 400s in particular to ensure we have safety around the expected experience if something fails. Otherwise, our router matches our page, our page variable matches the component, and we load...
         */
        try{
            switch (_page) {
                case 'homepage': return <HomePage {...this.props} />;
                default:
                    // Should 404
                    return <NotFoundPage {...this.props} />;
            }
        } catch (e) {
            //In the event that within our SPA, we throw an error with a message of 404 (ie. throw new Error(404)) it will show our NotFoundPage. Otherwise it will default to our 500 page.
            if(e.message === '404') {
                return <NotFoundPage {...this.props} />;
            }
            return <ErrorPage {...this.props} />;
        }
    }

    render() {
        return (this.getLayout(this.props.routeData.match));
    }
}

export default Pages;