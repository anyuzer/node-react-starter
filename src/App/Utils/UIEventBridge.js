import { ArcEvents } from 'arc-lib';

/*
    Document your events!
        URI_UPDATE: This updates the browser URL without triggering a route change. Useful when doing IN page updates
 */

class UIEventBridge {
    constructor() {
        //This turns our UIEventBridge into an event emitter, with on/emit, etc.
        ArcEvents.mixin(this);
    }

    get URI_UPDATE() {
        return 'URI_UPDATE';
    }

    get CLEAR_ERROR() {
        return 'CLEAR_ERROR';
    }
}

export default new UIEventBridge();