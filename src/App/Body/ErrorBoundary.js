import React from 'react';
import UIEventBridge from "../Utils/UIEventBridge";
import ErrorPage from "../Pages/Content/ErrorPage";
import NotFoundPage from "../Pages/Content/NotFoundPage";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, type: '' };
        this.listenerId;
    }

    componentDidMount() {
        /*
            When our ErrorBoundary is triggered, through getDerivedStateFromError, we end up in a state where SPA navigation can break,
            because nothing will render (even if we update URI), as our ErrorBoundary still thinks we're in an error state. To handle this,
            we allow navigation rerouting to clear the error on reroute. This ensures our content will attempt to load again (even it if
            means that it just triggers another error, and comes back here).
         */
        this.listenerId = UIEventBridge.on(UIEventBridge.CLEAR_ERROR, () => {
            this.setState({hasError: false, type: ''}); //Reset our boundary
        });
    }

    componentWillUnmount() {
        //Always clean up our listener on unmount
        UIEventBridge.clean(this.listenerId);
    }

    //This updates the state through React magic
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            type: error.message === '404' ? '404' : '500'
        };
    }

    async componentDidCatch(error, errorInfo) {
        if(this.state.type === '404') {
            //In this case, we don't really care about a not found. So we don't log anything.
            return;
        }
        /*
        //This is where we can catch any client data we want for error analysis in logging / sentry, whatever. It might look something like this.
        const debugObj = {
            userId: UserState.getUserId(),
            path: this.props.routeData.path,
            agent: navigator.userAgent,
            errorStack: error.stack,
            componentStack: errorInfo.componentStack
        };

        RemoteClient.catchError(debugObj);
         */
    }

    render() {
        //If we have an error, we render one of two pages (404 or 500)
        if (this.state.hasError) {
            if(this.state.type === '404') {
                return <NotFoundPage {...this.props} />;
            }
            return <ErrorPage {...this.props} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;