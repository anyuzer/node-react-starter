import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';

import Provider from './Body/Provider';
import MetaResolver from './Utils/MetaResolver';
import UserState from './Utils/UserState';
import Router from "./Utils/Router";


UserState.deserialize(window.app.userProfile);

if(window.hmr) {
    console.log('HMR Detected. Switching to client render.');
    Router.on('reroute', ([pageData, routeData]) => {
        console.log('Client caught reroute event??')
    })
    const root = createRoot(document.getElementById('app'))
    root.render(<Provider
        routeData={window.app.routeData}
        pageData={window.app.pageData}
        userProfile={window.app.userProfile}
        metaResolver={new MetaResolver(window.app.routeData)}
    />);
} else {
//Hydrate Root is used for SSR. Which does not play well with HMR at a glance (maybe it does, but whatever).
    hydrateRoot(document.getElementById('app'), <Provider
        routeData={window.app.routeData}
        pageData={window.app.pageData}
        userProfile={window.app.userProfile}
        metaResolver={new MetaResolver(window.app.routeData)}
    />);
}


