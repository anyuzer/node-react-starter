import React, { Fragment } from 'react';

import ErrorPage from './ErrorPage';

class PageContent extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(window) {
            //This may be imperfect... but for now seems to work
            window.scrollTo(0,0);
        }
    }

    getLayout(_page) {
        switch (_page) {
            default:
                // Should 404
                return <ErrorPage {...this.props} />;
        }
    }

    render() {
        return (this.getLayout(this.props.routeObj.match));
    }
}

export default PageContent;