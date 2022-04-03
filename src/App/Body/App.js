import React from 'react';
import serialize from "serialize-javascript";

import Router from '../Utils/Router';
import Pages from '../Pages/Pages';

import UIEventBridge from "../Utils/UIEventBridge";
import UserState from "../Utils/UserState";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeData: props.routeData,
            pageData: props.pageData
        };
        this._reroute = this._reroute.bind(this);
        Router.on('reroute', this._reroute);
    }

    componentDidMount() {
        window.onpopstate = (_event) => {
            if (_event.state) {
                Router.reroute(_event.state.code, undefined, true);
            }
        };
    }

    render() {
        //This is our root render tree. We simply update our state on a reroute, and we render
        const { routeData, pageData } = this.state;
        return (
            <React.Fragment>
                <Pages
                    routeData={routeData}
                    pageData={pageData}
                    metaResolver={this.props.metaResolver}
                />
            </React.Fragment>
        );
    }

    _reroute(_uri, _routeData, _pageData, _popstate) {
        this.setState({
            routeData: _routeData,
            pageData: _pageData
        }, () => {
            UIEventBridge.emit(UIEventBridge.CLEAR_ERROR,[]);
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


}

export default App;