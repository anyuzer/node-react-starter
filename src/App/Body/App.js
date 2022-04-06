import React from 'react';
import serialize from "serialize-javascript";

import DirectDOM from "../Utils/DirectDOM";
import Router from '../Utils/Router';
import UIEventBridge from "../Utils/UIEventBridge";
import MetaResolver from "../Utils/MetaResolver";
import UserState from "../Utils/UserState";

import Pages from '../Pages/Pages';
import ExampleWebShell from './ExampleWebShell';
import ErrorBoundary from "./ErrorBoundary";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeData: props.routeData,
            pageData: props.pageData
        };
        this._reroute = this._reroute.bind(this);
        this._pushURI = this._pushURI.bind(this);
        Router.on('reroute', this._reroute);
        UIEventBridge.on(UIEventBridge.URI_UPDATE, this._pushURI);
    }

    componentDidMount() {
        const DOM = new DirectDOM(window.document);
        window.onpopstate = (_event) => {
            if (_event.state) {
                Router.reroute(_event.state.code, true);
            }
        };

        const { metaResolver } = this.props;
        metaResolver.on(MetaResolver.EVENT_CHANGE_TITLE, DOM.setTitle.bind(DOM));
        metaResolver.on(MetaResolver.EVENT_CHANGE_OGTITLE, DOM.setOGTitle.bind(DOM));
        metaResolver.on(MetaResolver.EVENT_CHANGE_OGTYPE, DOM.setOGType.bind(DOM));
        metaResolver.on(MetaResolver.EVENT_CHANGE_OGURL, DOM.setOGUrl.bind(DOM));
        metaResolver.on(MetaResolver.EVENT_CHANGE_OGIMAGE, DOM.setOGImage.bind(DOM));
        metaResolver.on(MetaResolver.EVENT_CHANGE_OGDESCRIPTION, DOM.setOGDescription.bind(DOM));
    }

    render() {
        //This is our root render tree. We simply update our state on a reroute, and we render
        const { routeData, pageData } = this.state;
        const passThroughProps = {
            routeData, pageData, metaResolver: this.props.metaResolver
        }
        return (
            <React.Fragment>
                <ExampleWebShell {...passThroughProps}>
                    <ErrorBoundary {...passThroughProps}>
                        <Pages {...passThroughProps} />
                    </ErrorBoundary>
                </ExampleWebShell>
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