import React from 'react';

import Router from './Router';
import PageContent from './PageContent';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeObj: props.routeObj,
            pageData: props.pageData
        };
        Router.on('reroute', this._reroute.bind(this));
    }

    componentDidMount() {
        window.onpopstate = (_event) => {
            if (_event.state) {
                Router.reroute(_event.state.code, undefined, true);
            }
        };
    }

    _reroute(_uri, _routeObj, _pageData, _popstate) {
        this.setState({
            routeObj: _routeObj,
            pageData: _pageData
        }, () => {
            if (!_popstate) {
                this._pushURI(_uri);
            }
        });
    }

    _pushURI(_newURI, _replace) {
        const fullHistoryString = decodeURI(_newURI);
        if (_replace) {
            return window.history.replaceState({ code: fullHistoryString }, "", fullHistoryString);
        }
        return window.history.pushState({ code: fullHistoryString }, "", fullHistoryString);
    }

    render() {
        const { routeObj, pageData } = this.state;
        return (
            <React.Fragment>
                <PageContent routeObj={routeObj} pageData={pageData} />
            </React.Fragment>
        );
    }
}

export default App;